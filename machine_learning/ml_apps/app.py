import os
from typing import List, Dict, Any

import requests
from flask import Flask, jsonify, render_template, request


app = Flask(__name__)

LM_STUDIO_BASE_URL = os.getenv("LM_STUDIO_BASE_URL", "http://127.0.0.1:1234/v1")
CHAT_COMPLETIONS_URL = f"{LM_STUDIO_BASE_URL.rstrip('/')}" + "/chat/completions"
MODELS_URL = f"{LM_STUDIO_BASE_URL.rstrip('/')}" + "/models"
DEFAULT_MODEL = os.getenv("LM_STUDIO_MODEL", "")
REQUEST_TIMEOUT_SECONDS = float(os.getenv("LM_STUDIO_TIMEOUT", "60"))


def resolve_model_name() -> str:
    if DEFAULT_MODEL:
        return DEFAULT_MODEL

    try:
        response = requests.get(MODELS_URL, timeout=10)
        response.raise_for_status()
        data = response.json()
        models = data.get("data", [])
        if models:
            return models[0].get("id", "local-model")
    except requests.RequestException:
        pass

    return "local-model"


@app.route("/")
def index() -> str:
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat() -> Any:
    payload = request.get_json(silent=True) or {}
    user_message = (payload.get("message") or "").strip()
    history = payload.get("history") or []

    if not user_message:
        return jsonify({"error": "Message is required."}), 400

    if not isinstance(history, list):
        return jsonify({"error": "History must be a list."}), 400

    messages: List[Dict[str, str]] = []
    for item in history:
        if not isinstance(item, dict):
            continue
        role = item.get("role")
        content = item.get("content")
        if role in {"system", "user", "assistant"} and isinstance(content, str):
            messages.append({"role": role, "content": content})

    messages.append({"role": "user", "content": user_message})

    body = {
        "model": resolve_model_name(),
        "messages": messages,
        "temperature": 0.7,
        "stream": False,
    }

    try:
        response = requests.post(
            CHAT_COMPLETIONS_URL,
            json=body,
            timeout=REQUEST_TIMEOUT_SECONDS,
        )
        response.raise_for_status()
        result = response.json()

        assistant_reply = (
            result.get("choices", [{}])[0]
            .get("message", {})
            .get("content", "")
            .strip()
        )

        if not assistant_reply:
            return jsonify({"error": "Model returned an empty response."}), 502

        return jsonify({"reply": assistant_reply, "model": body["model"]})

    except requests.RequestException as exc:
        return (
            jsonify(
                {
                    "error": "Failed to connect to LM Studio API.",
                    "details": str(exc),
                    "url": CHAT_COMPLETIONS_URL,
                }
            ),
            502,
        )


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)

from transformers import pipeline

# Load the emotion classifier (one-time load at module level)
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=False)

EMOJI_MAP = {
    "joy": "😊",
    "anger": "😠",
    "sadness": "😢",
    "optimism": "🌈",
    "fear": "😰",
    "disgust": "🤢",
    "neutral": "😐"
}

def detect_emotion(text: str) -> str:
    try:
        result = emotion_classifier(text)[0]
        emotion = result['label'].lower()
        emoji = EMOJI_MAP.get(emotion, "😐")
        return emoji
    except Exception as e:
        print(f"[Emotion Detection Error] {e}")
        return "😐"
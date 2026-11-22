import os
import json
import uuid
import time
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

app = FastAPI(
    title="StopThat! Signboard API",
    description="Backend API for creating, sharing, and discovering personal stop signboards",
    version="1.0.0"
)

# Enable CORS for frontend integration (Vercel, Render, local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
DATA_FILE = os.path.join(DATA_DIR, "signs.json")

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Curated presets & templates
TEMPLATES = [
    # Work & Office
    {
        "id": "tpl-1",
        "category": "Work & Career",
        "headline": "STOP",
        "message": "HAVING A 1-HOUR MEETING THAT COULD'VE BEEN A 2-LINE EMAIL",
        "subnote": "Effective immediately: Decline all agenda-less invites.",
        "theme": "cardboard",
        "font": "marker",
        "stickers": ["APPROVED", "100% TRUTH"]
    },
    {
        "id": "tpl-2",
        "category": "Work & Career",
        "headline": "I QUIT",
        "message": "REPLYING TO SLACK MESSAGES AFTER 6 PM",
        "subnote": "Your urgent emergency is not my overtime.",
        "theme": "picket",
        "font": "bebas",
        "stickers": ["🛑", "STAMP: NOPE"]
    },
    {
        "id": "tpl-3",
        "category": "Work & Career",
        "headline": "CAN WE PLEASE",
        "message": "STOP SAYING 'PER MY LAST EMAIL' JUST SAY 'CAN YOU NOT READ'",
        "subnote": "Corporate politeness has reached toxic levels.",
        "theme": "hazard",
        "font": "bebas",
        "stickers": ["10/10 TIRED"]
    },
    {
        "id": "tpl-4",
        "category": "Work & Career",
        "headline": "NO MORE",
        "message": "MANDATORY 'FUN' TEAM BONDING AFTER WORK HOURS",
        "subnote": "Bonding is giving me a bonus and letting me go home.",
        "theme": "letterboard",
        "font": "typewriter",
        "stickers": ["APPROVED"]
    },

    # Social & Friends
    {
        "id": "tpl-5",
        "category": "Social & Friends",
        "headline": "STOP",
        "message": "SENDING 4-MINUTE VOICE NOTES WITH 10 SECONDS OF INFORMATION",
        "subnote": "I'm not listening to a podcast episode about what you had for lunch.",
        "theme": "cardboard",
        "font": "marker",
        "stickers": ["🛑", "VERIFIED REASON"]
    },
    {
        "id": "tpl-6",
        "category": "Social & Friends",
        "headline": "PLEASE STOP",
        "message": "TEXTING 'ARE YOU FREE?' WITHOUT SAYING WHAT YOU WANT FIRST",
        "subnote": "My availability depends entirely on what you want me to do.",
        "theme": "cyber",
        "font": "display",
        "stickers": ["100% TRUTH", "🔥"]
    },
    {
        "id": "tpl-7",
        "category": "Social & Friends",
        "headline": "I OFFICIALLY REFUSE",
        "message": "TO SPLIT THE BILL EVENLY WHEN I ONLY ORDERED FRIES AND WATER",
        "subnote": "Your three cocktails and lobster are on you, bestie.",
        "theme": "hazard",
        "font": "bebas",
        "stickers": ["STAMP: NOPE"]
    },
    {
        "id": "tpl-8",
        "category": "Social & Friends",
        "headline": "STOP",
        "message": "FEELING GUILTY FOR CANCELING PLANS TO ROT IN BED IN SILENCE",
        "subnote": "Social battery: 0%. Couch mode: Activated.",
        "theme": "letterboard",
        "font": "typewriter",
        "stickers": ["APPROVED"]
    },

    # Family & Relatives
    {
        "id": "tpl-9",
        "category": "Family & Relatives",
        "headline": "STOP ASKING",
        "message": "'WHEN ARE YOU GETTING MARRIED?' AT EVERY WEDDING",
        "subnote": "Do you want me to start asking 'When's your funeral?' at funerals?",
        "theme": "cardboard",
        "font": "marker",
        "stickers": ["🛑", "STAMP: NOPE"]
    },
    {
        "id": "tpl-10",
        "category": "Family & Relatives",
        "headline": "NO MORE",
        "message": "COMPARING ME TO SHARMA JI'S KID OR COUSIN RAHUL",
        "subnote": "Let Sharma Ji adopt Rahul if he's that impressive.",
        "theme": "picket",
        "font": "bebas",
        "stickers": ["10/10 TIRED"]
    },
    {
        "id": "tpl-11",
        "category": "Family & Relatives",
        "headline": "STOP",
        "message": "FORCING ME TO EAT A 4TH HELPING OF FOOD 'BECAUSE YOU LOVE ME'",
        "subnote": "I love you too, but my stomach is not a black hole.",
        "theme": "neon",
        "font": "marker",
        "stickers": ["APPROVED"]
    },

    # Mental Peace & Boundaries
    {
        "id": "tpl-12",
        "category": "Self-Care & Boundaries",
        "headline": "I QUIT",
        "message": "SAYING 'YES' WHEN MY SOUL IS SCREAMING 'HELL NO'",
        "subnote": "My peace of mind is no longer negotiable.",
        "theme": "cardboard",
        "font": "marker",
        "stickers": ["VERIFIED REASON", "🔥"]
    },
    {
        "id": "tpl-13",
        "category": "Self-Care & Boundaries",
        "headline": "STOP",
        "message": "EXPLAINING YOURSELF TO PEOPLE COMMITTED TO MISUNDERSTANDING YOU",
        "subnote": "Silence is the highest form of self-respect.",
        "theme": "letterboard",
        "font": "typewriter",
        "stickers": ["100% TRUTH"]
    },
    {
        "id": "tpl-14",
        "category": "Self-Care & Boundaries",
        "headline": "NO MORE",
        "message": "DOOMSCROLLING REELS TILL 3 AM WHILE MY EYES CRY FOR HELP",
        "subnote": "Closing the phone and choosing 8 hours of sleep.",
        "theme": "cyber",
        "font": "display",
        "stickers": ["🛑", "10/10 TIRED"]
    },

    # Lifestyle & Daily Annoyances
    {
        "id": "tpl-15",
        "category": "Everyday Annoyances",
        "headline": "CAN WE STOP",
        "message": "WALKING SUPER SLOW 4-PEOPLE ABREAST BLOCKING THE ENTIRE SIDEWALK",
        "subnote": "Some of us have places to be and zero patience.",
        "theme": "hazard",
        "font": "bebas",
        "stickers": ["🛑", "APPROVED"]
    },
    {
        "id": "tpl-16",
        "category": "Everyday Annoyances",
        "headline": "STOP",
        "message": "PLAYING TIKTOK VIDEOS ON FULL SPEAKER IN PUBLIC TRANSPORT",
        "subnote": "Headphones were invented in 1910. Please look into them.",
        "theme": "picket",
        "font": "bebas",
        "stickers": ["STAMP: NOPE", "10/10 TIRED"]
    }
]

class SignBoard(BaseModel):
    id: Optional[str] = None
    headline: str = Field(..., max_length=50)
    message: str = Field(..., max_length=200)
    subnote: Optional[str] = Field("", max_length=120)
    author: Optional[str] = Field("Anonymous Rebel", max_length=50)
    category: str = Field("Self-Care & Boundaries")
    shape: str = Field("octagon")    # octagon, diamond, glassCard, triangle
    theme: str = Field("glassAura")  # glassAura, classicRed, warningAmber, neon
    font: str = Field("display")     # display, marker, bebas, handwriting, typewriter
    aspectRatio: str = Field("1:1")  # 1:1, 9:16, 16:9
    tilt: int = Field(0, ge=-10, le=10)
    holder: str = Field("none")      # none, dude, hoodie, paws, hands, stick
    stickers: List[str] = Field(default_factory=list)
    likes: int = 0
    created_at: float = Field(default_factory=time.time)

# Helper to load / save signs from disk
def load_signs() -> List[dict]:
    if not os.path.exists(DATA_FILE):
        # Seed with initial community favorites
        seed_data = []
        for i, tpl in enumerate(TEMPLATES[:8]):
            seed_data.append({
                "id": f"sign-seed-{i+1}",
                "headline": tpl["headline"],
                "message": tpl["message"],
                "subnote": tpl["subnote"],
                "author": ["Alex R.", "Jordan K.", "Samir P.", "Priya M.", "Taylor S."][i % 5],
                "category": tpl["category"],
                "theme": tpl["theme"],
                "font": tpl["font"],
                "aspectRatio": "1:1",
                "tilt": -2 if i % 2 == 0 else 2,
                "holder": ["dude", "hoodie", "hands", "paws", "stick"][i % 5],
                "stickers": tpl["stickers"],
                "likes": 14 + (i * 7),
                "created_at": time.time() - (86400 * (i + 1) * 0.4)
            })
        save_signs(seed_data)
        return seed_data
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return []

def save_signs(signs: List[dict]):
    try:
        os.makedirs(DATA_DIR, exist_ok=True)
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(signs, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Warning: could not write to disk: {e}")

@app.get("/")
def root():
    return {
        "status": "online",
        "app": "StopThat! Signboard API",
        "version": "1.0.0",
        "health": "/api/health",
        "docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": "StopThat Signboard API", "version": "1.0.0"}

@app.get("/api/templates")
def get_templates():
    return {"templates": TEMPLATES}

@app.get("/api/signs")
def get_signs(
    category: Optional[str] = None,
    sort: str = Query("latest", pattern="^(latest|trending|oldest)$"),
    limit: int = Query(30, ge=1, le=100)
):
    signs = load_signs()
    
    if category and category != "All":
        signs = [s for s in signs if s.get("category") == category]
    
    if sort == "trending":
        signs.sort(key=lambda s: s.get("likes", 0), reverse=True)
    elif sort == "oldest":
        signs.sort(key=lambda s: s.get("created_at", 0))
    else:
        signs.sort(key=lambda s: s.get("created_at", 0), reverse=True)
        
    return {"signs": signs[:limit], "total": len(signs)}

@app.get("/api/signs/{sign_id}")
def get_sign(sign_id: str):
    signs = load_signs()
    for s in signs:
        if s.get("id") == sign_id:
            return s
    raise HTTPException(status_code=404, detail="Signboard not found")

@app.post("/api/signs", status_code=status.HTTP_201_CREATED)
def create_sign(sign_input: SignBoard):
    signs = load_signs()
    sign_dict = sign_input.model_dump()
    sign_dict["id"] = f"sign-{uuid.uuid4().hex[:8]}"
    sign_dict["created_at"] = time.time()
    sign_dict["likes"] = 1  # Creator's own vote of confidence!
    
    signs.insert(0, sign_dict)
    save_signs(signs)
    return sign_dict

@app.post("/api/signs/{sign_id}/like")
def like_sign(sign_id: str):
    signs = load_signs()
    for s in signs:
        if s.get("id") == sign_id:
            s["likes"] = s.get("likes", 0) + 1
            save_signs(signs)
            return {"id": sign_id, "likes": s["likes"], "success": True}
    raise HTTPException(status_code=404, detail="Signboard not found")

@app.get("/api/stats")
def get_stats():
    signs = load_signs()
    total_signs = len(signs)
    total_likes = sum(s.get("likes", 0) for s in signs)
    categories = {}
    for s in signs:
        cat = s.get("category", "General")
        categories[cat] = categories.get(cat, 0) + 1
    top_category = max(categories.items(), key=lambda x: x[1])[0] if categories else "Self-Care & Boundaries"
    
    return {
        "totalSigns": total_signs,
        "totalAgrees": total_likes,
        "topCategory": top_category,
        "activeProtesters": max(15, total_signs * 3)
    }

# Mount static frontend build if present
FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
if os.path.exists(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="assets")

    @app.api_route("/{full_path:path}", methods=["GET", "HEAD"])
    async def serve_spa(full_path: str):
        # Don't intercept API routes
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API route not found")
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.isfile(index_file):
            return FileResponse(index_file)
        raise HTTPException(status_code=404, detail="File not found")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)

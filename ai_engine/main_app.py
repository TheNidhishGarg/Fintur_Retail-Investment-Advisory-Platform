import os
import sys
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent

from app.tools.documents import fetch_company_documents
from app.tools.fundamental import fetch_screener_fundamentals
from app.tools.technical import fetch_technical_data
from app.tools.news import fetch_stock_news
from app.tools.orderbook import fetch_order_book
from app.rag.query import search_company_documents

load_dotenv()

# ── Key Rotation ──────────────────────────────────────────────────────────────
GOOGLE_API_KEYS = [
    os.getenv("GOOGLE_API_KEY_1"),
    os.getenv("GOOGLE_API_KEY_2"),
    os.getenv("GOOGLE_API_KEY_3"),
    os.getenv("GOOGLE_API_KEY"),
]
GOOGLE_API_KEYS = [k for k in GOOGLE_API_KEYS if k]

if not GOOGLE_API_KEYS:
    print("⚠️  Error: No GOOGLE_API_KEY found in environment")
    sys.exit(1)

current_key_index = 0

def get_llm():
    global current_key_index
    for i in range(len(GOOGLE_API_KEYS)):
        key = GOOGLE_API_KEYS[(current_key_index + i) % len(GOOGLE_API_KEYS)]
        try:
            os.environ["GOOGLE_API_KEY"] = key
            llm = ChatGoogleGenerativeAI(
                model="gemini-2.5-flash-lite",
                temperature=0,
                max_retries=2,
                safety_settings={
                    "HARM_CATEGORY_HARASSMENT":        "BLOCK_NONE",
                    "HARM_CATEGORY_HATE_SPEECH":       "BLOCK_NONE",
                    "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
                    "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE",
                },
            )
            current_key_index = (current_key_index + i + 1) % len(GOOGLE_API_KEYS)
            return llm
        except Exception:
            continue
    raise Exception("All Google API keys exhausted")

llm = get_llm()

# ── Tools ─────────────────────────────────────────────────────────────────────
tools = [
    fetch_company_documents,        # Screener docs + BSE filings (unified)
    fetch_screener_fundamentals,    # Balance sheet, P&L, ratios, peers
    fetch_technical_data,           # OHLCV + indicators (yfinance)
    fetch_stock_news,               # Tavily multi-query news search
    fetch_order_book,               # Order book tracker (RAG + news + BSE filings)
    search_company_documents,       # Direct RAG on annual reports + concalls
]

# ── System Prompt ─────────────────────────────────────────────────────────────
SYSTEM_PROMPT = """
You are a Senior Hedge Fund Analyst for the Indian Stock Market (NSE/BSE) focused on long-term value investing.

TOOLS AVAILABLE:
1. fetch_company_documents(url) - Annual reports, BSE filings. Call FIRST.
2. fetch_screener_fundamentals(ticker) - Balance sheet, P&L, ratios, shareholding.
3. fetch_technical_data(ticker, period, start_date, end_date) - OHLCV + indicators.
4. fetch_stock_news(ticker, queries=[]) - Recent news, regulatory risk, sector outlook.
5. fetch_order_book(ticker, sector_hint, ltm_revenue_cr, bse_order_filings) - Order book size, B2B ratio.
6. search_company_documents(ticker, search_query) - RAG search on annual reports + concalls.

STEPS:
1. fetch_company_documents first → get BSE filings + doc links
2. fetch_screener_fundamentals → get LTM revenue, balance sheet, ratios
3. fetch_order_book → pass ltm_revenue_cr + bse_order_filings
4. fetch_technical_data → trend, momentum, support/resistance
5. search_company_documents → management guidance, capex, debt, risks
6. fetch_stock_news → recent catalysts, sector outlook

OUTPUT (be concise, every claim backed by a number):
1. Executive Summary — Buy/Hold/Avoid + 2-sentence thesis
2. Fundamental Analysis — Growth, margins, cash flow quality
3. Order Book — Size, Book-to-Bill ratio, revenue visibility
4. Technical Analysis — Trend, momentum, key levels, stop-loss
5. Document Insights — Management guidance, capex, risks
6. News & Sentiment — Recent catalysts, regulatory risks
7. Risk Assessment — Red flags, valuation, macro risks
8. Final Recommendation — Actionable, 12-18 month horizon

Tone: Professional. Direct. Cite every number. Analyze, don't narrate.
"""

# ── Agent ─────────────────────────────────────────────────────────────────────
agent = create_react_agent(
    model=llm,
    tools=tools,
    prompt=SYSTEM_PROMPT,
)


# ── Runner ────────────────────────────────────────────────────────────────────
# ── Runner ────────────────────────────────────────────────────────────────────
def run_analysis(query: str) -> None:
    print(f"\n🚀 Starting analysis: {query}\n{'─' * 60}")
    try:
        result = agent.invoke(
            {"messages": [HumanMessage(content=query)]}
        )
        output_message = result["messages"][-1]
        print("\n🤖 ANALYSIS COMPLETE:\n")
        
        if hasattr(output_message, "content"):
            content = output_message.content
            
            # 1. If the content is already a plain string, just print it
            if isinstance(content, str):
                print(content)
                
            # 2. If it's a list of blocks (like in your output), extract the text
            elif isinstance(content, list):
                for block in content:
                    if isinstance(block, dict) and block.get("type") == "text":
                        print(block.get("text"))
                        
    except Exception as e:
        print(f"❌ Error during execution: {e}")


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("📈 Indian Stock Analyst — Long-Term Value Investing Framework")
    print("Type 'q' to exit.\n")

    while True:
        user_input = input(
            "Enter query (e.g. 'Analyze L&T' or 'Backtest HAL in 2024'): "
        ).strip()
        if user_input.lower() in ("q", "quit", "exit"):
            break
        if not user_input:
            continue
        run_analysis(user_input)
# from http import client
from nntplib import ArticleInfo
from supabase import create_client, Client
import requests 
import json
from google import genai
from requests.auth import HTTPBasicAuth
from markdown_pdf import MarkdownPdf,Section



def send_html_to_gemini(html_content,client):
    response = client.models.generate_content(
    model="gemini-2.0-flash", 
    contents=["""Convert the given HTML content into a well-structured and well-defined Markdown format. Do not include any additional explanation or commentary. Return only the Markdown string.""",html_content])
    print(response.text)
    return response.text




def markdown_to_pdf(article_id):
    supabase = init_supabase()

    content = get_article_content(supabase,article_id)

    client = init_gemini()

    markdown =  send_html_to_gemini(content,client)

    pdf = MarkdownPdf(toc_level=2)
    pdf.add_section(Section(markdown),user_css = """@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Open+Sans:wght@400;600;700&display=swap');

body {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: #2c3e50;
    background-color: #ffffff;
    margin: 2rem auto;
    max-width: 768px;
    padding: 0 1rem;
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Open Sans', serif;
    font-weight: 700;
    color: #1a1a1a;
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.3;
}

h1 {
    font-size: 2rem;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.3rem;
}

h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.2rem;
}

h3 {
    font-size: 1.25rem;
}

h4 {
    font-size: 1.125rem;
}

h5 {
    font-size: 1rem;
}

h6 {
    font-size: 0.875rem;
    color: #555;
}

/* Paragraphs */
p {
    font-size: 14px;
    margin-bottom: 1rem;
}

/* Links */
a {
    color: #007acc;
    text-decoration: none;
    border-bottom: 1px dotted #007acc;
}

a:hover {
    text-decoration: underline;
    border-bottom: none;
}

/* Blockquote */
blockquote {
    border-left: 4px solid #007acc;
    padding-left: 1rem;
    color: #555;
    font-style: italic;
    margin: 1.5rem 0;
    background: #f9f9f9;
}

/* Code */
code {
    background-color: #f4f4f4;
    border-radius: 4px;
    padding: 2px 5px;
    font-family: monospace;
    font-size: 90%;
}

pre {
    background-color: #f4f4f4;
    border-radius: 6px;
    padding: 1rem;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.6;
}

/* Tables */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 14px;
}

th, td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
}

th {
    background-color: #f2f2f2;
    font-weight: 600;
}

/* Lists */
ul, ol {
    padding-left: 2rem;
    margin-bottom: 1rem;
}

ul li, ol li {
    margin-bottom: 0.2rem;
}

/* Horizontal Rule */
hr {
    border: none;
    height: 1px;
    background: #e0e0e0;
    margin: 2rem 0;
}

/* Images */
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem 0;
}
    """)
    pdf.save("output.pdf")



        




def init_gemini():
    client = genai.Client(api_key="AIzaSyDNcnPNLS0Qg3Wjan8L-ok3V3pjb-4-1iQ")
    return client



def get_article_content(supabase,article_id):
        response = (supabase.table("articles")
        .select("*")
        .eq("article_id", article_id)
        .execute())   
        article_content = response.data[0]['content_text']
        return article_content



def init_supabase():
    VITE_SUPABASE_URL="https://mouwhbulaoghvsxbvmwj.supabase.co"
    VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdXdoYnVsYW9naHZzeGJ2bXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NjI1NzQsImV4cCI6MjA1NjAzODU3NH0.52PcqiCjO8L1VU1lY7t01VLVSD_Cvz0OQFuPfT7lJ2w"

    supabase_url = VITE_SUPABASE_URL
    supabase_key = VITE_SUPABASE_ANON_KEY
    supabase: Client = create_client(supabase_url, supabase_key)
    return supabase



markdown_to_pdf("557845bc-ecbd-4528-b91d-83f609d95ab6")
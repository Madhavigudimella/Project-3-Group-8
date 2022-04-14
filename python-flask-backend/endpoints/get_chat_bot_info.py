import json
from unicodedata import category
from database import pipeline_connection


def lambda_handler(event):
    session = pipeline_connection()
    category = event.get('category', None)
    region = event.get('region', None)
    columns = ('name', 'followers', 'views')
    if not (category and region):
        return {"Message": "Please send category and region"}
    youtube_influencers = get_most_video_youtube_influencers(
        session, category, region)
    instagram_influencers = get_most_video_instagram_influencers(
        session, category, region)
    results = []
    for row in youtube_influencers:
        results.append({"youtube": dict(zip(columns, row))})
    for row in instagram_influencers:
        results.append({"instagram": dict(zip(columns, row))})

    return json.dumps(results)


def get_most_video_youtube_influencers(session, category, region):
    cur = session.cursor()
    query = f"""
    Select channel_name as name, subscribers as followers, average_views as views from youtube where category = '{category}' and audience_country = '{region}' Order by views DESC Limit 3
    """
    cur.execute(query)
    influencers = cur.fetchall()
    cur.close()
    return influencers


def get_most_video_instagram_influencers(session, category, region):
    cur = session.cursor()
    query = f"""
    Select influencer_insta_name as name, followers, engagement_avg as views from instagram where category = '{category}' and audience_country = '{region}' Order by views DESC Limit 3    """
    cur.execute(query)
    influencers = cur.fetchall()
    cur.close()
    session.close()
    return influencers

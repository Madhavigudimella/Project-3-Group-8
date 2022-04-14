import json
from database import pipeline_connection


def lambda_handler(event):
    session = pipeline_connection()
    graph_type = event.get('graph_type')
    if graph_type == "youtube":
        top_influencers_list = get_top_youtube_influencers(session, event)
        columns = (
            'id', 'name', 'category',
            'followers',
            'audience_country',
            'average_views',
            'average_likes',
            'average_comments',
        )
    elif graph_type == "instagram":
        top_influencers_list = get_top_instagram_influencers(session, event)
        columns = (
            'id', 'name',
            'category',
            'followers',
            'audience_country',
            'authentic_engagement',
            'engagement_avg',
        )
    else:
        return {"message": "Wrong Grpah Type given"}

    results = []
    for row in top_influencers_list:
        results.append(dict(zip(columns, row)))
        print(json.dumps(results))
    return json.dumps(results)


def get_top_youtube_influencers(session, event):
    cur = session.cursor()
    limit = event.get('limit')
    query = f"""
    SELECT id, channel_name as name, category,
            subscribers as followers,
            audience_country,
            average_views,
            average_likes,
            average_comments
     FROM youtube  order by followers desc Limit {limit} ;
    """
    cur.execute(query)
    influencers = cur.fetchall()
    cur.close()
    session.close()
    return influencers


def get_top_instagram_influencers(session, event):
    cur = session.cursor()
    limit = event.get('limit')
    query = f"""
    SELECT   id,
            influencer_insta_name as name,
            category,
            followers,
            audience_country,
            authentic_engagement,
            engagement_avg FROM instagram order by followers desc Limit {limit};
    """
    cur.execute(query)
    influencers = cur.fetchall()
    cur.close()
    session.close()
    return influencers

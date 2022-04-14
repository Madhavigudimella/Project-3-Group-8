import json
from urllib import response
from database import pipeline_connection


def lambda_handler(event):
    session = pipeline_connection()
    graph_type = event.get('graph_type')
    if graph_type == "youtube":
        top_influencers_list = get_top_youtube_influencers_country_wise(
            session, event)
        columns = (
            'followers',
            'audience_country',
        )
    elif graph_type == "instagram":
        top_influencers_list = get_top_instagram_influencers_country_wise(
            session, event)
        columns = (
            'followers',
            'audience_country',
        )
    else:
        return {"message": "Wrong Grpah Type given"}

    results = []
    for row in top_influencers_list:
        results.append(dict(zip(columns, row)))
        print(json.dumps(results))
    for result in results:
        if result['audience_country'] == "United States":
            result['audience_country'] = "USA"
    return json.dumps(results)


def get_top_youtube_influencers_country_wise(session, event):
    cur = session.cursor()
    limit = event.get('limit')
    query = f"""
    Select  sum(subscribers) as followers, audience_country from youtube group by audience_country order by followers DESC limit {limit} ;
    """
    cur.execute(query)
    influencers = cur.fetchall()
    cur.close()
    session.close()
    return influencers


def get_top_instagram_influencers_country_wise(session, event):
    cur = session.cursor()
    limit = event.get('limit')
    query = f"""
    Select  sum(followers) as followers, audience_country from instagram group by audience_country order by followers DESC limit {limit} ;
    """
    cur.execute(query)
    influencers = cur.fetchall()
    cur.close()
    session.close()
    return influencers

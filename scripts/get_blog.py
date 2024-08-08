import requests
import json
from datetime import datetime
import os
import re
import uuid


strapi_blog_url = ""
strapi_upload_url = ""
API_KEY = ""

def generate_code():
    new_code = str(uuid.uuid4())
    return new_code

def fetch_strapi_blogs():
    response = requests.get(f"{strapi_blog_url}?_limit=100", headers={"Authorization": f"Bearer {API_KEY}"})
    if response.status_code == 200:
        return response.json()['results']
    else:
        print(f"Failed to fetch blogs from Strapi: {response.text}")
        return []

def create_entries(data_array):
    for data in data_array:
        response = requests.post(
            strapi_blog_url,
            json=data,
            headers={"Content-Type": "application/json",  "Authorization": f"bearer {API_KEY}",},
        )
        if response.status_code == 200:
            print(f"Entry created successfully: {data}")
        else:
            print(f"Failed to create entry: {data}")
            print(f"Response: {response.text}")

def create_slug(title):
    slug = title.lower().replace(" ", "-")
    slug = re.sub(r'[^A-Za-z0-9-_.~]', '', slug)
    return slug

# Helper function to download an image
def download_image(url, filename):
    response = requests.get(url)
    if response.status_code == 200:
        with open(filename, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded image: {filename}")
    else:
        print(f"Failed to download image: {url}")

def upload_image_to_strapi(image_path):
    files = {'files': open(image_path, 'rb')}
    headers = {'Authorization': f'Bearer {API_KEY}'}
    response = requests.post(strapi_upload_url, headers=headers, files=files)
    if response.status_code == 200:
        print(f"Uploaded image: {response.json()[0]['id']}")
        return response.json()[0]['id']
    else:
        print(f"Failed to upload image to Strapi: {response.content}")
        return None

code = generate_code()
url = "https://taiko.mirror.xyz/api/graphql"
headers = {
    'accept': '*/*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'content-type': 'application/json',
    'cookie': f'anonymousUserId={code};',
    'origin': 'https://taiko.mirror.xyz',
    'priority': 'u=1, i',
    'referer': 'https://taiko.mirror.xyz/',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
}

payload = {
    "operationName": "ProjectPage",
    "variables": {
        "projectAddress": "taiko.mirror.xyz",
        "limit": 100
    },
    "query": """
        query ProjectPage($projectAddress: String!, $limit: Int, $cursor: Int) {
          projectFeed(projectAddress: $projectAddress, limit: $limit, cursor: $cursor) {
            _id
            domain
            ens
            theme {
              accent
              colorMode
              __typename
            }
            displayName
            ens
            address
            ...projectPage
            ...publicationLayoutProject
            __typename
          }
        }

        fragment projectPage on ProjectType {
          _id
          address
          avatarURL
          description
          displayName
          domain
          ens
          twitterUsername
          externalUrl
          theme {
            accent
            colorMode
            __typename
          }
          headerImage {
            id
            url
            __typename
          }
          posts {
            ... on crowdfund {
              _id
              id
              __typename
            }
            ... on entry {
              _id
              id
              body
              digest
              title
              publishedAtTimestamp
              writingNFT {
                _id
                optimisticNumSold
                proxyAddress
                purchases {
                  numSold
                  __typename
                }
                __typename
              }
              collectorBubbles {
                _id
                address
                project {
                  ...projectDetails
                  __typename
                }
                __typename
              }
              featuredImage {
                mimetype
                url
                __typename
              }
              publisher {
                ...publisherDetails
                __typename
              }
              settings {
                ...entrySettingsDetails
                __typename
              }
              __typename
            }
            ... on SubscriberEditionType {
              _id
              __typename
            }
            __typename
          }
          __typename
        }

        fragment projectDetails on ProjectType {
          _id
          address
          avatarURL
          description
          displayName
          domain
          ens
          gaTrackingID
          ga4TrackingID
          mailingListURL
          twitterUsername
          wnftChainId
          externalUrl
          headerImage {
            ...mediaAsset
            __typename
          }
          theme {
            ...themeDetails
            __typename
          }
          __typename
        }

        fragment mediaAsset on MediaAssetType {
          id
          cid
          mimetype
          sizes {
            ...mediaAssetSizes
            __typename
          }
          url
          __typename
        }

        fragment mediaAssetSizes on MediaAssetSizesType {
          og {
            ...mediaAssetSize
            __typename
          }
          lg {
            ...mediaAssetSize
            __typename
          }
          md {
            ...mediaAssetSize
            __typename
          }
          sm {
            ...mediaAssetSize
            __typename
          }
          __typename
        }

        fragment mediaAssetSize on MediaAssetSizeType {
          src
          height
          width
          __typename
        }

        fragment themeDetails on UserProfileThemeType {
          accent
          colorMode
          __typename
        }

        fragment publisherDetails on PublisherType {
          project {
            ...projectDetails
            __typename
          }
          member {
            ...projectDetails
            __typename
          }
          __typename
        }

        fragment entrySettingsDetails on EntrySettingsType {
          description
          metaImage {
            ...mediaAsset
            __typename
          }
          title
          __typename
        }

        fragment publicationLayoutProject on ProjectType {
          _id
          avatarURL
          displayName
          domain
          address
          ens
          gaTrackingID
          ga4TrackingID
          mailingListURL
          description
          __typename
        }
    """
}
strapi_blogs = fetch_strapi_blogs()
strapi_link = [blog['link'] for blog in strapi_blogs]
response = requests.post(url, headers=headers, json=payload)
data = response.json()
transformed_data_list = []

# Process each post
for post in data['data']['projectFeed']['posts']:
    post_id = post['_id']
    link = f"https://taiko.mirror.xyz/{post_id}"
    title = post.get('title', 'N/A')
    published_at = post.get('publishedAtTimestamp', 'N/A')
    featured_image_url = post.get('featuredImage', {}).get('url', 'N/A')
    formatted_date = datetime.fromtimestamp(published_at).strftime('%Y-%m-%d') if published_at != 'N/A' else 'N/A'
    slug = create_slug(title)
    print(link)
    if link not in strapi_link:
        print("Unpublished blog: "+ title)
        # Download featured image
        imgid = "placeholder_imgid"
        if featured_image_url != 'N/A':
            img_filename = os.path.basename(featured_image_url.split('?')[0])  # Remove query parameters from URL
            download_image(featured_image_url, img_filename)
            imgid = upload_image_to_strapi(img_filename)

        # Transform the data into the desired format
        transformed_data = {
            "category": {
                "disconnect": [],
                "connect": [{"id": 1, "position": {"end": True}}]
            },
            "slug": slug,
            "link": f"https://taiko.mirror.xyz/{post_id}",
            "date": formatted_date,
            "content": [
                {
                    "type": "paragraph",
                    "children": [
                        {"type": "text", "text": title}
                    ]
                }
            ],
            "howToApply": [
                {
                    "type": "paragraph",
                    "children": [
                        {"type": "text", "text": "Visit our github"}
                    ]
                }
            ],
            "title": title,
            "timeToRead": "6 min",
            "image": imgid,
        }

        # Add to the list
        transformed_data_list.append(transformed_data)


create_entries(transformed_data_list)
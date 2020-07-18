import React, {Component} from 'react'

export default class PostDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {
                "_id": {"$oid": "5e587f6b9f060333622a94f8"},
                "picture_cat": [],
                "tagged_user_id": [],
                "user_like": ["459563664987316", "101579916360096920981", "101546607491391701749", "10221656981074204"],
                "user_dislike": ["113850571165656107074", "117330993025203671639"],
                "user_superlike": ["196404347996989", "116997045719475058835", "10212778298124742", "10218677788245463", "10218797596517095"],
                "user_fav_posts": [],
                "nb_fav": {"$numberInt": "0"},
                "nb_like": {"$numberInt": "4"},
                "nb_dislike": {"$numberInt": "2"},
                "nb_superlike": {"$numberInt": "5"},
                "isMoodboard": false,
                "isShadowban": false,
                "isJuvenile": false,
                "description": "Toulouse 🤍",
                "username": "Valou",
                "picture": "picture-1582858090521.jpg",
                "user": "524888568157776",
                "comments": [],
                "created_at": {"$date": {"$numberLong": "1582858091186"}},
                "__v": {"$numberInt": "11"}
            },
            user: {
                "_id": {"$oid": "5e4af31c496a44260c113768"},
                "fav_cat": ["Minimaliste", "Streetwear", "Customisation", "High Fashion", "Hype / Trendy", "Sportswear", "Sneakerhead", "Vintage"],
                "fav_posts": [],
                "country": "France",
                "friend_list": [],
                "post_liked": [],
                "post_disliked": [],
                "post_superliked": [],
                "notifications": [
                    {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T20:29:51.334Z",
                    "postId": "5e4af508496a44260c11376c",
                    "picture": "picture-1581970688119.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T20:53:41.443Z",
                    "postId": "5e4af508496a44260c11376c",
                    "picture": "picture-1581970688119.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T20:53:43.867Z",
                    "postId": "5e4af3d9496a44260c113769",
                    "picture": "picture-1581970391146.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T20:57:44.697Z",
                    "postId": "5e4af508496a44260c11376c",
                    "picture": "picture-1581970688119.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T20:57:49.369Z",
                    "postId": "5e4af3d9496a44260c113769",
                    "picture": "picture-1581970391146.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T21:45:57.455Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T22:17:56.938Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T22:51:25.367Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-17T22:52:08.591Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T00:07:08.049Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T00:07:08.049Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T07:23:08.531Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T07:23:55.621Z",
                    "postId": "5e4af3d9496a44260c113769",
                    "picture": "picture-1581970391146.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T07:45:13.653Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Nouveau comm'!",
                    "body": "Florian Grs a commenté ta photo",
                    "date": "2020-02-18T10:09:34.666Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T10:09:39.746Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T10:14:47.224Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T10:40:36.046Z",
                    "postId": "5e4af508496a44260c11376c",
                    "picture": "picture-1581970688119.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T11:36:16.745Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T11:36:23.133Z",
                    "postId": "5e4af508496a44260c11376c",
                    "picture": "picture-1581970688119.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T12:18:06.321Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T12:22:14.998Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Nouveau comm'!",
                    "body": "Boukar Sall a commenté ta photo",
                    "date": "2020-02-18T12:22:46.120Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T12:22:52.114Z",
                    "postId": "5e4af508496a44260c11376c",
                    "picture": "picture-1581970688119.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T12:22:57.387Z",
                    "postId": "5e4af3d9496a44260c113769",
                    "picture": "picture-1581970391146.jpg",
                    "read": false
                }, {
                    "title": "Nouveau comm'!",
                    "body": "Boukar Sall a commenté ta photo",
                    "date": "2020-02-18T12:23:20.259Z",
                    "postId": "5e4af3d9496a44260c113769",
                    "picture": "picture-1581970391146.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T12:55:24.924Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T12:55:26.386Z",
                    "postId": "5e4af508496a44260c11376c",
                    "picture": "picture-1581970688119.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T12:55:28.609Z",
                    "postId": "5e4af3d9496a44260c113769",
                    "picture": "picture-1581970391146.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T13:04:47.928Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T13:13:38.956Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T14:29:31.279Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T15:53:18.265Z",
                    "postId": "5e4be9b2496a44260c113869",
                    "picture": "picture-1582033327060.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T16:38:18.093Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T19:10:07.484Z",
                    "postId": "5e4af508496a44260c11376c",
                    "picture": "picture-1581970688119.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-18T19:35:30.942Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-20T23:53:33.104Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-20T23:53:39.375Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-25T04:25:48.160Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Nouveau comm'!",
                    "body": "SeptFaSept a commenté ta photo",
                    "date": "2020-02-25T04:26:06.668Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-25T06:05:11.071Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-25T06:30:56.903Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-25T12:05:33.919Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-25T12:05:33.919Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-25T12:07:16.255Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Nouveau comm'!",
                    "body": "Boukar Sall a commenté ta photo",
                    "date": "2020-02-25T12:09:27.803Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-25T13:11:07.548Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-26T09:08:19.769Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-26T14:41:03.024Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-26T14:41:03.024Z",
                    "postId": "5e547e537f867d790b30440a",
                    "picture": "picture-1582595664275.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T07:31:19.796Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T09:08:32.980Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T09:08:32.980Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T09:08:46.942Z",
                    "postId": "5e4b0655496a44260c113792",
                    "picture": "picture-1581975122951.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T09:08:32.980Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T09:08:32.980Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T09:38:18.542Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T09:42:51.443Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T10:19:14.750Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T10:29:47.574Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T17:07:53.991Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-28T18:06:46.462Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-29T10:36:03.892Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-29T13:35:04.818Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }, {
                    "title": "Bang bang !",
                    "body": "Tu as une nouvelle réaction!",
                    "date": "2020-02-29T23:55:17.798Z",
                    "postId": "5e587f6b9f060333622a94f8",
                    "picture": "picture-1582858090521.jpg",
                    "read": false
                }],
                "fb_id": "524888568157776",
                "name": "Shiawase Valentine",
                "email": "vagutilef@gmail.com",
                "role": {"modo": false, "certified_profile": false, "designer": false, "marque": false, "admin": false},
                "profile_pic": "http://35.181.29.44:9000/profile_pics/5e4af31c496a44260c113768-1581970338306.jpg",
                "register_date": {"$date": {"$numberLong": "1581970204613"}},
                "__v": {"$numberInt": "67"},
                "username": "Valou",
                "yearOfBirth": {"$numberInt": "2000"},
                "bio": "Valentine, Toulouse ❤️\n\nInsta : val3ntina_gtz",
                "tel": "0642513785",
                "meta": {"city": "Pessac", "region": "NAQ", "country": "FR"},
                "expoPushToken": "ExponentPushToken[H1wczdKGvM1sH2_7iP-Xrn]",
                "fav_users": [],
                "join_squad_request": [],
                "squad": []
            },
        }
    }

    render() {
        const { user, post } = this.state
        return (
            <div>
                {post === null ? <span>Loading...</span> :
                    <div style={styles.container}>
                        <div>
                            <img
                                style={styles.picture}
                                src={'http://35.181.29.44:9000/images/' + post.picture}
                            />
                            <div>
                                <button> Précédent</button>
                                <button> Suivant</button>
                            </div>
                        </div>
                        <div style={styles.actions}>
                            <div>
                                Here we're going to put info about the post


                            </div>

                            <button> Mettre dans la Collection de l'utilisateur</button>
                            <button> Shadowban !</button>
                            <input/>
                            <button> Sauvegarder le commentaire</button>
                        </div>
                        <div style={styles.userInfo}>
                            <div>
                                <h1>{ user.username || user.name }</h1>
                                <img src={user.profile_pic} style={{height: 250}}/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )

    }
}

const styles = {
    container: {
        display: 'flex',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    picture: {
        height: '80%',
        width: '100%',
    },
}
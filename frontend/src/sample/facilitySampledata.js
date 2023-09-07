  const facilityData = [
    {
      "key": 0,
      "name": "서울중구장애인복지관",
      "type": "시설타입 1",
      "info": "시설 정보를 나타냅니다.",
      "location": "서울특별시 중구 퇴계로 460 중구 구민 복지관 4 층",
      "facility": {
        "toilet": true,
        "ramp": true,
        "elevator" :true
      },
      "review": [
        {
          "title": "리뷰 1",
          "reviewscore": 4.5,
          "content": "리뷰 내용"
        },
        {
          "title": "리뷰 2",
          "reviewscore": 4.5,
          "content": "리뷰 내용"
        },
        {
          "title": "리뷰 3",
          "reviewscore": 4.5,
          "content": "리뷰 내용",
        },
      ],
    },
    {
      "key": 1,
      "name": "동국대학교 서울캠퍼스",
      "type": "시설타입 2",
      "info": "시설 정보를 나타냅니다.",
      "location": "서울특별시 중구 필동로1길 30",
      "facility": {
        "toilet": true,
        "ramp": false,
        "elevator" :true
      },
      "review": [
        {
          "title": "리뷰 제목",
          "reviewscore": 4.5,
          "content": "리뷰 내용"
        },
        {
          "title": "리뷰 제목",
          "reviewscore": 4.5,
          "content": "리뷰 내용"
        }
      ],
    },
    {
      "key": 2,
      "name": "서울역사박물관",
      "type": "시설타입 3",
      "info": "시설 정보를 나타냅니다.",
      "location": "서울특별시 종로구 새문안로 55 서울역사박물관",
      "facility": {
        "toilet": true,
        "ramp": true,
        "elevator" :false
      },
      "review": [
        {
          "title": "리뷰 제목",
          "reviewscore": 4.5,
          "content": "리뷰 내용"
        },
        {
          "title": "리뷰 제목",
          "reviewscore": 4.5,
          "content": "리뷰 내용"
        }
      ],
    },
    {
      "key": 3,
      "name": "시설 4",
      "type": "시설타입 4",
      "info": "시설 정보를 나타냅니다.",
      "location": "지역 4",
      "facility": {
        "toilet": true,
        "ramp": false,
        "elevator" :true
      },
      "review": [
        {
          "title": "리뷰 제목",
          "reviewscore": 4.5,
          "content": "리뷰 내용"
        },
        {
          "title": "리뷰 제목",
          "reviewscore": 4.5,
          "content": "리뷰 내용"
        }
      ],
    }      
  ]

  export default facilityData;

 /*  {
    "likedFacilityList": [
      {
        "id": 2,
        "name": "논현 노인복지관",
        "latitued": "37",
        "longitude": "127",
        "equipment": "계단 또는 승강설비, 대변기, 소변기"
        "address": "서울특별시"
      },
      {
        "id": 3,
        "name": "하상장애인복지관",
        "latitued": "37",
        "longitude": "127",
        "equipment": "계단 또는 승강설비, 대변기, 소변기"
        "address": "서울특별시"
      }
    ]
  } */
export class GlobalConstants {
    public static nodeRadius: number = 25
    public static codeBasicDFS: string = "basicDFS"
    public static canvasWidth: number = 800
    public static canvasHeight: number = 800
    public static defaultGraph = {
        "id": 1,
        "name": "Default",
        "directed": false,
        "weighted": false,
        "binaryTree": false,
        "userId": 2,
        "nodes": [
            {
                "id": 1,
                "connectionList": [
                    {
                        "endNode": 2
                    },
                    {
                        "endNode": 3
                    },
                    {
                        "endNode": 8
                    }
                ],
                "root": true,
                "ypos": 144,
                "xpos": 189
            },
            {
                "id": 2,
                "connectionList": [
                    {
                        "endNode": 1
                    },
                    {
                        "endNode": 4
                    },
                    {
                        "endNode": 8
                    }
                ],
                "root": false,
                "ypos": 351,
                "xpos": 141
            },
            {
                "id": 3,
                "connectionList": [
                    {
                        "endNode": 1
                    },
                    {
                        "endNode": 5
                    },
                    {
                        "endNode": 8
                    }
                ],
                "root": false,
                "ypos": 141,
                "xpos": 400
            },
            {
                "id": 4,
                "connectionList": [
                    {
                        "endNode": 2
                    },
                    {
                        "endNode": 6
                    },
                    {
                        "endNode": 8
                    }
                ],
                "root": false,
                "ypos": 526,
                "xpos": 225
            },
            {
                "id": 5,
                "connectionList": [
                    {
                        "endNode": 3
                    },
                    {
                        "endNode": 7
                    },
                    {
                        "endNode": 8
                    }
                ],
                "root": false,
                "ypos": 251,
                "xpos": 627
            },
            {
                "id": 6,
                "connectionList": [
                    {
                        "endNode": 4
                    },
                    {
                        "endNode": 7
                    },
                    {
                        "endNode": 8
                    }
                ],
                "root": false,
                "ypos": 595,
                "xpos": 499
            },
            {
                "id": 7,
                "connectionList": [
                    {
                        "endNode": 6
                    },
                    {
                        "endNode": 5
                    },
                    {
                        "endNode": 8
                    }
                ],
                "root": false,
                "ypos": 434,
                "xpos": 678
            },
            {
                "id": 8,
                "connectionList": [
                    {
                        "endNode": 3
                    },
                    {
                        "endNode": 2
                    },
                    {
                        "endNode": 4
                    },
                    {
                        "endNode": 6
                    },
                    {
                        "endNode": 7
                    },
                    {
                        "endNode": 5
                    },
                    {
                        "endNode": 1
                    }
                ],
                "root": false,
                "ypos": 344,
                "xpos": 398
            }
        ]
    }
}
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    //Player pos in grid 0-15
    int gridPos;
    int prevGridPos;

    //Player Transform
    Vector3 worldPos;

    //Player halfs
    Vector3 topHalf;
    Vector3 bottomHalf;

    //Tiles
    GameObject[] tiles;

    // Start is called before the first frame update
    void Start()
    {
        gridPos = 1;
        prevGridPos = 0;

        worldPos = gameObject.transform.position;
        topHalf = gameObject.GetComponentInChildren<Transform>().position;
        bottomHalf = gameObject.transform.GetChild(1).position;

        tiles = GameObject.FindGameObjectsWithTag("Tile");

        UpdateWorldPos();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.W))
        {
            MovePlayer(-4, true);
            Console.WriteLine("Hello");
        }
        else if (Input.GetKeyDown(KeyCode.S))
        {
            MovePlayer(4, true);
        }
        else if (Input.GetKeyDown(KeyCode.A) && gridPos != 4 && gridPos != 8 && gridPos != 12)
        {
            MovePlayer(-1, false);
        }
        else if (Input.GetKeyDown(KeyCode.D) && gridPos != 3 && gridPos != 7 && gridPos != 11)
        {
            MovePlayer(1, false);
        }
    }

    void MovePlayer(int _posChange, bool isRoll)
    {
        //Changes grid position
        if (gridPos + _posChange >= 0 && gridPos + _posChange <= 15)
        {
            prevGridPos += _posChange;

            gridPos += _posChange;
        }

        UpdateWorldPos();
    }

    void UpdateWorldPos()
    {
        topHalf.x = tiles[gridPos].transform.position.x;
        topHalf.y = tiles[gridPos].transform.position.y;
        gameObject.GetComponentInChildren<Transform>().position = topHalf;

        bottomHalf.x = tiles[prevGridPos].transform.position.x;
        bottomHalf.y = tiles[prevGridPos].transform.position.y;
        gameObject.transform.GetChild(1).position = bottomHalf;

    }
}

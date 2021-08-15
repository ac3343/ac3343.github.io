﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class NotifContainer : MonoBehaviour
{
    [SerializeField]
    private GameObject notifPrefab;
    [SerializeField]
    private uint Capacity;

    private List<GameObject> currentNotifs;

    // Start is called before the first frame update
    void Start()
    {
        currentNotifs = new List<GameObject>();
    }

    // Update is called once per frame
    void Update()
    {
        CheckNotifs();
    }

    public void AddNotif(string text)
    {
        //Instantiates notif prefab and sets its text
        GameObject newNotif = Instantiate(notifPrefab, this.transform);
        newNotif.GetComponentInChildren<Text>().text = text;

        //Moves other notifications upward
        for (int i = currentNotifs.Count - 1; i >= 0; i--)
        {
            if (currentNotifs[i] != null)
            {
                Vector3 notifPos = currentNotifs[i].transform.position;
                currentNotifs[i].transform.position = new Vector3(notifPos.x, notifPos.y + 60);
            }

        }

        //Adds new notification to list
        currentNotifs.Add(newNotif);
    }

    void CheckNotifs()
    {
        for(int i = currentNotifs.Count - 1; i >= 0; i--)
        {
            if(currentNotifs[i] == null)
            {
                currentNotifs.RemoveAt(i);
            }

        }
    }
}

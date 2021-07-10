using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BattleManager : MonoBehaviour
{
    NotifContainer notifications;
    // Start is called before the first frame update
    void Start()
    {
        notifications = FindObjectOfType<NotifContainer>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyUp(KeyCode.Space))
        {
            notifications.AddNotif("wutizgoinerr");
        }
    }
}

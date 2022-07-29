using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Time_Player : MonoBehaviour
{
    Rigidbody rb;
    [SerializeField]
    float f_moveSpeed = 5;
    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        Vector3 toMove = new Vector3(0, 0, 0);
        if (Input.GetKey(KeyCode.W))
        {
            //rb.AddForce(new Vector3(1, 0, 0));
            toMove.x = f_moveSpeed;
        }
        if (Input.GetKey(KeyCode.A))
        {
            //rb.AddForce(new Vector3(0, 0, 1));
            toMove.z = f_moveSpeed;
        }
        if (Input.GetKey(KeyCode.S))
        {
            //rb.AddForce(new Vector3(-1, 0, 0));
            toMove.x = -f_moveSpeed;
        }
        if (Input.GetKey(KeyCode.D))
        {
            //rb.AddForce(new Vector3(0, 0, -1));
            toMove.z = -f_moveSpeed;
        }
        //gameObject.transform.position += toMove * Time.deltaTime;
        rb.AddForce(toMove);
    }
}

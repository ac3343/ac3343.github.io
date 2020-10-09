using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public float X
    {
        get { return transform.position.x; }
    }
    public float Y
    {
        get { return transform.position.y; }
    }

    [SerializeField]
    float maxSpeed = 0.003f;
    [SerializeField]
    float acceleration = 0.0001f;

    Vector2 currentPos;
    Vector2 prevPos;
    float velocity;

    // Start is called before the first frame update
    void Start()
    {
        currentPos = prevPos = transform.position;
        velocity = 0;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(KeyCode.D))
        {
            if (velocity < maxSpeed)
            {
                velocity += acceleration;
            }
        }
        if (Input.GetKey(KeyCode.A))
        {
            if (velocity > -maxSpeed)
            {
                velocity -= acceleration;
            }
        }
        if (!Input.anyKey)
        {
            velocity /= 3;
        }

        currentPos.x += velocity;
        transform.position = currentPos;
        prevPos = currentPos;
    }
}

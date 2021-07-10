using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UINotif : MonoBehaviour
{
    private const float time = 5.0f;
    private float elapsedTime = 0.0f;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void FixedUpdate()
    {
        elapsedTime += Time.deltaTime;

        if(elapsedTime > time)
        {
            Destroy(this.gameObject);
        }
    }
}

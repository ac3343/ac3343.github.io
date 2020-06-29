using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HitBox : MonoBehaviour
{
    int damage;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void SetDamage(int _damage)
    {
        damage = _damage;
    }

    public int DealDamage()
    {
        Destroy(gameObject);
        return damage;
    }
}

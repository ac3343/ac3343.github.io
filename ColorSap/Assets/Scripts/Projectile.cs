using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Projectile : MonoBehaviour
{
    Round roundInfo;
    bool hasHitEnemy;

    // Start is called before the first frame update
    void Start()
    {
        hasHitEnemy = false;
    }

    // Update is called once per frame
    void Update()
    {
        if (hasHitEnemy)
        {
            Destroy(gameObject);
        }
    }

    public void SetRoundType(Round _round)
    {
        roundInfo = _round;
    }

    public int HitEnemy()
    {
        hasHitEnemy = true;
        return roundInfo.Damage;
    }
}

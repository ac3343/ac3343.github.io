using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    int health;
    Player playerRef;

    // Start is called before the first frame update
    void Start()
    {
        health = 100;
        playerRef = FindObjectOfType<Player>();
    }

    // Update is called once per frame
    void Update()
    {
        GameObject playerHitBox = GameObject.FindGameObjectWithTag("HitBox");

        if(playerHitBox != null)
        {
            IsHitByWeapon();
        }

        Projectile[] projectiles = GameObject.FindObjectsOfType<Projectile>();

        for(int i = 0; i < projectiles.Length; i++)
        {
            IsHitByProjectile(projectiles[i]);
        }
    }

    void IsHitByWeapon()
    {
        int damage = playerRef.HitEnemy();
        health -= damage;

        Debug.Log("Enemy takes " + damage + " damage and has " + health + " health left");

        if(health <= 0)
        {
            Debug.Log("Enemy has died");
            Destroy(gameObject);
        }
    }

    void IsHitByProjectile(Projectile currentProj)
    {
        int damage = currentProj.HitEnemy();
        health -= damage;

        Debug.Log("Enemy takes " + damage + " damage and has " + health + " health left");

        if (health <= 0)
        {
            Debug.Log("Enemy has died");
            Destroy(gameObject);
        }
    }
}

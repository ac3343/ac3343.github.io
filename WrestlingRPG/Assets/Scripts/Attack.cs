using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Attack
{
    string attackName;
    int damage;
    bool infoSet = false;

    public int Damage
    {
        get { return damage; }
    }

    public string Name
    {
        get { return attackName; }
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void SetAttackInfo(string name, int damage)
    {
        //Checks to see if the info has already been set
        if (!infoSet)
        {
            //Sets attack name and damage
            attackName = name;
            this.damage = damage;
        }
        else
        {
            //Logs an error for trying to set the information more than once
            Debug.Log("Attack information already set!");
        }
    }
}

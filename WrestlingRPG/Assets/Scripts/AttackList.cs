using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AttackList
{
    //List of attacks
    static Attack punch = new Attack("Punch", 4, "Strike", 4);

    //Attack Properties
    public static Attack Punch
    {
        get { return punch; }
    }
}

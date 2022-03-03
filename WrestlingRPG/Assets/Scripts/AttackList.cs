using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AttackList
{
    //List of attacks
    static Attack punch = new Attack("Punch", 4, "Strike", 4);
    static Attack dropkick = new Attack("Dropkick", 7, "Strike", 6);

    //Attack Properties
    public static Attack Punch
    {
        get { return punch; }
    }
    public static Attack Dropkick
    {
        get { return dropkick; }
    }
}

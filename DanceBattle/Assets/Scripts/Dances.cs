using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class Dances
{
    public static void ComboEffect(Dancer dancer)
    {
        string combo = dancer.Combo;

        switch (combo[0])
        {
            case '0':
                dancer.BuildHype(4.5f);
                break;
            case '1':
                dancer.BuildHype(6);
                break;
            case '2':
                dancer.ApplyHypeBuff(.3f);
                break;
            case '3':
                dancer.ApplyStyleBuff(1);
                break;
        }
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AllColors
{
    public SoulColor Stone;
    public SoulColor Metal;
    public SoulColor Grass;
    public SoulColor Wood;

    public SoulColor[] ColorList;
    public AllColors()
    {
        Stone = new SoulColor("Stone", "Defense", new Weapon("Rock Fists", 60, 10), new Ammo("Rock Shards", 5, 0, 1));
        Metal = new SoulColor("Metal", "Defense", new Weapon("Metal Pole", 50, 20), new Ammo("Knives", 12, 1, 3));
        Grass = new SoulColor("Grass", "Speed", new Weapon("Thorn Whip", 40, 10), new Ammo("Ninja Stars", 10, 2, 1));
        Wood = new SoulColor("Wood", "Attack Range", new Weapon("Wood Beam", 100, 15), new Ammo("Logs", 2, 3, 1));

        ColorList = new SoulColor[] {Stone, Metal, Grass, Wood };

    }
}

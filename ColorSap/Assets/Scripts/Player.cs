using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    AllColors allColors;
    Queue<SoulColor> sappedColors;
    
    public GameObject hitboxPrefab;
    GameObject hitBox;

    Weapon equippedWeapon;

    public GameObject projectilePrefab;
    Queue<Round> rounds;
    Queue<int> roundsToFire;
    Queue<int> roundCount;
    int currentRoundCount;

    // Start is called before the first frame update
    void Start()
    {
        allColors = new AllColors();
        sappedColors = new Queue<SoulColor>();
        rounds = new Queue<Round>();
        roundsToFire = new Queue<int>();
        roundCount = new Queue<int>();
        currentRoundCount = 0;
    }

    // Update is called once per frame
    void Update()
    {
        
        if (Input.GetKeyDown(KeyCode.Space))
        {
            SapColor();
        }
        if (Input.GetKeyDown(KeyCode.RightArrow)){
            NextColor();
        }
        if (Input.GetKeyDown(KeyCode.LeftArrow))
        {
            PrevColor();
        }
        if (Input.GetKeyDown(KeyCode.A))
        {
            UseBoost();
        }
        if (Input.GetKeyDown(KeyCode.S))
        {
            CreateWeapon();
        }
        if (Input.GetKeyDown(KeyCode.D))
        {
            hitBox = Instantiate(hitboxPrefab);
        }
        if (Input.GetKeyDown(KeyCode.W))
        {
            CreateRounds();
        }
        if (Input.GetKeyDown(KeyCode.Q))
        {
            FireRound();
        }
        if (Input.anyKeyDown)
        {
            //PrintInfo();
        }
    }

    void SapColor()
    {
        if(sappedColors.Count < 3)
        {
            SoulColor sappedColor = GetColor();
            sappedColors.Enqueue(sappedColor);
            Debug.Log("Sapped " + sappedColor.Name);
        }
        else
        {
            Debug.Log("Colors full");
        }
    }

    SoulColor GetColor()
    {
        return allColors.ColorList[Random.Range(0, 4)];
    }
    void PrintColors()
    {
        Debug.Log(sappedColors.Count + " Colors Stored");
        for(int i = 0; i < sappedColors.Count; i++)
        {
            SoulColor currentColor = sappedColors.Dequeue();
            Debug.Log("Color " + (i + 1) + ": " + currentColor.Name);
            sappedColors.Enqueue(currentColor);
        }
    }
    void PrintInfo()
    {
        string info = "Player\nEquipped Weapon: ";
        info += equippedWeapon == null ? "None" : equippedWeapon.Name;
        info += "\nColors[" +sappedColors.Count+"]: ";
        for (int i = 0; i < sappedColors.Count; i++)
        {
            SoulColor currentColor = sappedColors.Dequeue();
            info += currentColor.Name + ", ";
            sappedColors.Enqueue(currentColor);
        }

        Debug.Log(info);
    }

    void NextColor()
    {
        SoulColor currentColor = sappedColors.Dequeue();
        sappedColors.Enqueue(currentColor);
    }

    void PrevColor()
    {
        NextColor();
        NextColor();
    }

    void CreateWeapon()
    {
        if(sappedColors.Count > 0)
        {
            SoulColor currentColor = sappedColors.Dequeue();
            equippedWeapon = currentColor.ColorWeapon;
            Debug.Log("Equipped Weapon is " + equippedWeapon.Name);
        }
        else
        {
            Debug.Log("No color available to create weapon");
        }
    }

    void DestroyWeapon()
    {
        string weaponName = equippedWeapon.Name;
        equippedWeapon = null;
        Debug.Log(weaponName + " destroyed");
    }

    void UseBoost()
    {
        if (sappedColors.Count > 0)
        {
            SoulColor currentColor = sappedColors.Dequeue();
            Debug.Log(currentColor.BoostEffect + " increased");
        }
        else
        {
            Debug.Log("No color available to use boost");
        }
        
    }
    
    void CreateRounds()
    {
        if (sappedColors.Count > 0)
        {
            SoulColor currentColor = sappedColors.Dequeue();
            roundsToFire.Enqueue(currentColor.AmmoType.RoundsPerShot);

            roundCount.Enqueue(currentColor.AmmoType.NumOfRounds);

            if(roundCount.Count == 1)
            {
                currentRoundCount = currentColor.AmmoType.NumOfRounds;
            }
             
            for(int i = 0; i < currentColor.AmmoType.NumOfRounds; i++)
            {
                rounds.Enqueue(new Round(currentColor.AmmoType.Damage));
            }
        }
        else
        {
            Debug.Log("No color available to create ammo");
        }
    }

    void FireRound()
    {
        if(rounds.Count > 0)
        {
            int currentRTF = roundsToFire.Peek();
            int remainingRounds = currentRoundCount - currentRTF;
            int remainder = 0;

            if (remainingRounds <= 0)
            {
                remainder = remainingRounds;

                roundsToFire.Dequeue();
                roundCount.Dequeue();
                currentRoundCount = roundCount.Peek();
            }

            for (int i = 0; i < currentRTF - remainder; i++)
            {
                GameObject newProjectile = Instantiate(projectilePrefab);

                newProjectile.GetComponent<Projectile>().SetRoundType(rounds.Dequeue());
            }
        }
        else
        {
            Debug.Log("Not enough rounds to fire");
        }
        
    }

    public int HitEnemy()
    {
        //Destroys hit box TEMPORARY
        Destroy(hitBox);

        if(equippedWeapon == null)
        {
            return 25;
        }
        else
        {
            return equippedWeapon.DamagePerHit;
        }
    }

    private void OnGUI()
    {
        for(int i = 0; i < rounds.Count; i++)
        {
            Round currentRound = rounds.Dequeue();

            //Prints round info to 
            GUI.Label(new Rect(100, 35 + i * 20, 200, 50), "Round " + (i + 1) + ": " + currentRound.Damage);
            rounds.Enqueue(currentRound);
        }
    }
}

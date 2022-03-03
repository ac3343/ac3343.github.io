using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public enum Souls
{
    Stone = 0,
    Metal = 1,
    Grass = 2,
    Wood = 3
}
public class Tile : MonoBehaviour
{
    [SerializeField]
    Souls tileSoul;
    bool isSapped;

    public int TileSoul
    {
        get { return (int)tileSoul; }
    }
    public bool IsSapped
    {
        get { return isSapped; }
    }
    // Start is called before the first frame update
    void Start()
    {
        isSapped = false;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void SapTile()
    {
        isSapped = true;
        GetComponent<SpriteRenderer>().color = Color.red;
    }
}

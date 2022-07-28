using UnityEngine;

[CreateAssetMenu(fileName = "Data", menuName = "Data/Dances", order = 1)]
public class Dance : ScriptableObject
{
    public string prefabName;

    public int numberOfPrefabsToCreate;
    public Vector3[] spawnPoints;
}

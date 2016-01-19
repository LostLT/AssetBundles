using UnityEngine;
using System.Collections;

public class RunTest : MonoBehaviour {
	
	private string url;
	private string progress;
	
	void Start()
	{
		progress = "";
		
		if (Application.platform == RuntimePlatform.WindowsWebPlayer || Application.platform == RuntimePlatform.OSXWebPlayer)
		{
			url = Application.dataPath + "/StreamingAssets/";
		}
		else
		{
			url = "file://" + Application.streamingAssetsPath +"/";
		}
		
		StartCoroutine(StartTest());
	}
	
	IEnumerator StartTest()
	{
		yield return new WaitForSeconds(2.0f);
		
		progress += "RUNNING SPRITE TEST...";
		yield return StartCoroutine(LoadAssetBundle("spriteTest"));
		progress += "DONE! (you should see two mario and they should be batched to 1 draw call)\n";
		yield return new WaitForSeconds(1.0f);
		progress += "RUNNING AUDIO TEST...";
		yield return StartCoroutine(LoadAssetBundle("audioTest"));
		progress += " DONE! (you should hear music now)\n";
		yield return new WaitForSeconds(1.0f);
		progress += "RUNNING TEXTURE TEST...";
		yield return StartCoroutine(LoadAssetBundle("textureTest"));
		progress += " DONE! (you should see texture on the cube)\n";
		yield return new WaitForSeconds(1.0f);
		progress += "RUNNING PREFAB TEST...";
		yield return StartCoroutine(LoadAssetBundle("prefabTest"));
		yield return new WaitForSeconds(1.0f);
		progress += " DONE! (you should see Lerpz with animation)\n";
		yield return new WaitForSeconds(1.0f);
		progress += "ALL TEST DONE";
		
		yield return new WaitForSeconds(1.0f);
	}
	
	IEnumerator LoadAssetBundle(string abname)
	{
		string allurl = url+abname+".unity3d";
		Debug.Log ("Working on: "+allurl);
		WWW www = new WWW(allurl);
		
		Debug.Log ("Downloading: "+abname);
		
		yield return www;
		
		AssetBundle ab = www.assetBundle;
		
		if(ab!=null)
		{
			Object obj = (Object) ab.mainAsset;
			
			if(obj)
			{
				if(obj.name.Equals("spriteTest"))
				{
					GameObject sGO = (GameObject) obj;
					SpriteRenderer sr = (SpriteRenderer) sGO.GetComponent<SpriteRenderer>();
					Debug.Log("SpriteRenderer: "+sr);
					Debug.Log("Sprite: "+sr.sprite);

					Instantiate(sGO,new Vector3(0,0,0),sGO.transform.rotation);

					Debug.Log("SPRITE TEST DONE (you should see two mario and they should be batched to 1 draw call)");
				}
				if(obj.name.Equals("audioTest"))
				{
					AudioClip aclip = (AudioClip) obj;
					this.GetComponent<AudioSource>().clip = aclip;
					this.GetComponent<AudioSource>().Play();
					
					Debug.Log ("AUDIO TEST DONE (you should hear music now)");
				}
				else if(obj.name.Equals("textureTest"))
				{
					Texture2D t2d = (Texture2D) obj;
					GameObject cb = (GameObject) GameObject.Find("Cube");
					cb.GetComponent<Renderer>().material.mainTexture = t2d;
					
					Debug.Log ("TEXTURE TEST DONE (you should see texture on the cube)");
				}
				else if(obj.name.Equals("prefabTest"))
				{
					GameObject pGO = (GameObject) obj;
					Instantiate(pGO,new Vector3(-2.0f,0.0f,0.0f),pGO.transform.rotation);
					
					Debug.Log ("PREFAB TEST DONE (you should see Lerpz running)");
				}
			}
			else
			{
				Debug.Log ("ERROR loading MainAsset from AssetBundle at: "+allurl);
				progress += "ERROR loading MainAsset from AssetBundle at: "+allurl;
			}
		}
		else
		{
			Debug.Log ("ERROR loading AssetBundle at: "+allurl);
			progress += "ERROR loading AssetBundle at: "+allurl;
		}
		
		yield return new WaitForSeconds(1.0f);
	}
	
	public static string AssetbundleBaseURL
	{
	    get
	    {
	        if (Application.platform == RuntimePlatform.WindowsWebPlayer || Application.platform == RuntimePlatform.OSXWebPlayer)
	            return Application.dataPath+"/assetbundles/";
	        else
	            return "file://" + Application.dataPath + "/../assetbundles/";
	    }
	}
	
	void OnGUI()
	{
		GUI.Label (new Rect(10,10,800,500),progress);
	}
}

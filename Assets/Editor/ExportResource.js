@MenuItem("Assets/Build AssetBundle From Selection - Track dependencies")
static function ExportResource () {
	// Bring up save panel
	var path = EditorUtility.SaveFilePanel ("Save Resource", "", "New Resource", "unity3d");
	if (path.Length != 0)
	{
		// Build the resource file from the active selection.
		var selection = Selection.GetFiltered(typeof(Object), SelectionMode.DeepAssets);
		
		BuildPipeline.BuildAssetBundle(Selection.activeObject, selection, path, BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets | BuildAssetBundleOptions.UncompressedAssetBundle, BuildTarget.Android);	
		Selection.objects = selection;
	}
}

@MenuItem("Assets/Build AssetBundle From Selection - No dependency tracking")
static function ExportResourceNoTrack () {
	// Bring up save panel
	var path = EditorUtility.SaveFilePanel ("Save Resource", "", "New Resource", "unity3d");
	if (path.Length != 0)
	{
		// Build the resource file from the active selection.
		BuildPipeline.BuildAssetBundle(Selection.activeObject, Selection.objects, path, BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets | BuildAssetBundleOptions.UncompressedAssetBundle, BuildTarget.Android);
	}
}

@MenuItem("Assets/Build All (Android)")
static function ExportAll () {
	var items : ArrayList = new ArrayList();
	var pathTO = Application.streamingAssetsPath+"/";
	var pathFROM = "Assets/FilesToMakeAssetBundlesFrom/";//Application.dataPath+"/FilesToMakeAssetBundlesFrom/";

	items.Add("audioTest.mp3");
	items.Add("prefabTest.prefab");
	items.Add("spriteTest.prefab");
	items.Add("textureTest.psd");

	for(var i=0;i<items.Count;i++)
	{
		var filepath = pathFROM+items[i];
		Debug.Log(filepath);
		var obj = UnityEditor.AssetDatabase.LoadMainAssetAtPath(filepath);
		Debug.Log("OBJ: "+obj);
		var objs = UnityEditor.AssetDatabase.LoadAllAssetRepresentationsAtPath(filepath);
		BuildPipeline.BuildAssetBundle(obj, objs, pathTO+System.IO.Path.GetFileNameWithoutExtension(items[i])+".unity3d", BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets | BuildAssetBundleOptions.UncompressedAssetBundle, BuildTarget.Android);
	}
}
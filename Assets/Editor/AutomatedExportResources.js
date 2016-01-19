@MenuItem("Tools/Auto Build Resource Files")
static function ExportResource () {

	//System.IO.Directory.CreateDirectory("StreamingAssets");

	var options = BuildAssetBundleOptions.CollectDependencies | BuildAssetBundleOptions.CompleteAssets | BuildAssetBundleOptions.UncompressedAssetBundle;
	var target = BuildTarget.Android;
	BuildPipeline.PushAssetDependencies();
	
	

	// All subsequent resources share assets in this resource file
	// It is up to you to ensure that the shared resource file is loaded prior to loading other resources
	BuildPipeline.BuildAssetBundle(AssetDatabase.LoadMainAssetAtPath("Assets/Artwork/lerpzuv.tif"), null, Application.dataPath + "/StreamingAssets/Shared.unity3d", options, target);	

	// By pushing and popping around the resource file, this file will share resources but later resource files will not share assets in this resource
	BuildPipeline.PushAssetDependencies();
	
	BuildPipeline.BuildAssetBundle(AssetDatabase.LoadMainAssetAtPath("Assets/Sounds/Music2d.mp3"), null, Application.dataPath + "/StreamingAssets/Music2d.unity3d", options, target);	

	BuildPipeline.PopAssetDependencies();
	
	
	BuildPipeline.PushAssetDependencies();
	
	BuildPipeline.BuildAssetBundle(AssetDatabase.LoadMainAssetAtPath("Assets/Artwork/Lerpz.fbx"), null, Application.dataPath + "/StreamingAssets/Lerpz.unity3d", options, target);	

	BuildPipeline.PopAssetDependencies();


	BuildPipeline.PushAssetDependencies();

	BuildPipeline.BuildAssetBundle(AssetDatabase.LoadMainAssetAtPath("Assets/Artwork/explosive guitex.prefab"), null, Application.dataPath + "/StreamingAssets/explosive.unity3d", options, target);	

	BuildPipeline.PopAssetDependencies();


	BuildPipeline.PushAssetDependencies();

	// Build streamed scene file into a seperate unity3d file
	BuildPipeline.BuildPlayer(["Assets/Scenes/AdditiveScene.unity"], Application.dataPath + "/StreamingAssets/AdditiveScene.unity3d", target, BuildOptions.BuildAdditionalStreamedScenes);	

	BuildPipeline.PopAssetDependencies();
	
	BuildPipeline.PushAssetDependencies();

	// Build streamed scene file into a seperate unity3d file
	BuildPipeline.BuildPlayer(["Assets/Scenes/AdditiveSound.unity"], Application.dataPath + "/StreamingAssets/AdditiveSound.unity3d", target, BuildOptions.BuildAdditionalStreamedScenes);	

	BuildPipeline.PopAssetDependencies();	
	
	BuildPipeline.PopAssetDependencies();
	
	BuildPipeline.BuildPlayer(["Assets/Scenes/Loader.unity"], "loader.apk", BuildTarget.Android, BuildOptions.Development);
}
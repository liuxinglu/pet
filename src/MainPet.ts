var ResPet = lxlPet.GlobalData.getInstance().resManager;
var Qipan = appPet.PetManager.getInstance();
class MainPet extends lxlPet.ApplicationPet {
    
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startPet(): void {
        super.startPet();
        this.root = new appPet.PetSence();
        lxlPet.GlobalData.getInstance().root = this;
        this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
    }

    private static instance:MainPet;
    public static getInstance():MainPet {
        if(this.instance == null)
            this.instance = new MainPet();
        return this.instance;
    }
}

export declare class App {
    private authFlow;
    private userInfo;
    private handleSignIn;
    private fetchUserInfo;
    private userCard;
    private userProfileImage;
    private userName;
    private snackbarContainer;
    constructor();
    signIn(username?: string): Promise<void>;
    private initializeUi;
    private updateUi;
    private showSnackBar;
    signOut(): void;
}

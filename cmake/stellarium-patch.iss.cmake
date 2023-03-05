; Stellarium patch installer
; Run "make install" first to generate the executable and translation files.
; The CMake-generated patch script is supposed to be edited manually after
; generation, but all changes will be OVERWRITTEN the next time CMake is run!
;
; This script creates a setup file for a patch that REPLACES some of the files
; in an existing Stellarium installation. (By default, only the executables.)
;
; Unlike a regular installation file, the patch installer does not create
; entries in the Start menu or an uninstaller. (So installing files that don't
; exist in the original instalaltion means that they won't be removed
; when uninstalling Stellarium.)
;
; @ISS_AUTOGENERATED_WARNING@

[Setup]
DisableStartupPrompt=yes
WizardSmallImageFile=@CMAKE_SOURCE_DIR@\data\icon.bmp
WizardImageFile=@CMAKE_SOURCE_DIR@\data\splash.bmp
WizardImageStretch=no
WizardImageBackColor=clBlack
AppName=Stellarium
; AppId should have the same value as AppName/AppId in the original installer
AppId=Stellarium
AppVersion=@PACKAGE_VERSION@
AppVerName=Stellarium @STELLARIUM_PUBLIC_VERSION@
AppCopyright=@STELLARIUM_COPYRIGHT@
AppPublisher=Stellarium team
AppPublisherURL=@STELLARIUM_URL@
AppSupportURL=@STELLARIUM_URL@
AppUpdatesURL=@STELLARIUM_URL@
VersionInfoVersion=@WINDOWS_PACKAGE_VERSION@
MinVersion=0,@ISS_MIN_WIN_VERSION@
SetupIconFile=@CMAKE_SOURCE_DIR@\data\@PACKAGE_ICON@.ico
OutputBaseFilename=stellarium-@ISS_PACKAGE_VERSION@-patch-@ISS_PACKAGE_PLATFORM@
OutputDir=@CMAKE_SOURCE_DIR@\installers
DefaultDirName={autopf}\Stellarium
DefaultGroupName=Stellarium
UninstallDisplayIcon={app}\data\stellarium.ico
LicenseFile=@CMAKE_SOURCE_DIR@\COPYING
ChangesAssociations=yes
; LZMA2/max required 95 MB RAM for compression and 8 MB RAM for decompression
; Using LZMA2/max algorithm reduces size of package on ~10%
Compression=lzma2/max

; If uncommented, this file will be displayed before the installation begins
; (see http://www.jrsoftware.org/ishelp/index.php?topic=wizardpages)
;InfoBeforeFile=patch-warning.txt

; Detect and use Stellarium's install directory
UsePreviousAppDir=yes
CreateUninstallRegKey=no
UpdateUninstallLogAppName=no


[Files]
Source: "@CMAKE_INSTALL_PREFIX@\bin\stellarium.exe"; DestDir: "{app}"; Flags: ignoreversion

; Some of these may need to be updated
;Source: "@CMAKE_SOURCE_DIR@\*.md"; DestDir: "{app}"; Flags: ignoreversion
;Source: "@CMAKE_SOURCE_DIR@\COPYING"; DestDir: "{app}"; Flags: ignoreversion; DestName: "GPL.txt"
;Source: "@CMAKE_SOURCE_DIR@\ChangeLog"; DestDir: "{app}"; Flags: ignoreversion; DestName: "ChangeLog.txt"

; Add further files to be updated here:

; System libraries skipped - when building a patch, it's recommended to use
; the ones used in the last/appropriate release.

; Uncomment to update data and/or localization
;Source: "@CMAKE_INSTALL_PREFIX@\share\stellarium\*"; DestDir: "{app}\"; Flags: recursesubdirs ignoreversion

[Tasks]
; It may be necessary to clean up the old configuration,
; so some of these can be checked by default.
; Don't forget to uncomment the actions themselves in [InstallDelete] below!

; Name: removecache; Description: "{cm:RemoveCache}"; GroupDescription: "{cm:RemoveFromPreviousInstallation}"
; Name: removeconfig; Description: "{cm:RemoveMainConfig}"; GroupDescription: "{cm:RemoveFromPreviousInstallation}"
; Name: removeplugins; Description: "{cm:RemovePluginsConfig}"; GroupDescription: "{cm:RemoveFromPreviousInstallation}"; Flags: unchecked
; Name: removesolar; Description: "{cm:RemoveSolarConfig}"; GroupDescription: "{cm:RemoveFromPreviousInstallation}"

[Run]
; An option to start Stellarium after setup has finished
Filename: "{app}\stellarium.exe"; Description: "{cm:LaunchProgram,Stellarium}"; Flags: postinstall nowait skipifsilent unchecked

[InstallDelete]
;The old log file in all cases
Type: files; Name: "{userappdata}\Stellarium\log.txt"
; Type: files; Name: "{userappdata}\Stellarium\config.ini"; Tasks: removeconfig
; Type: files; Name: "{userappdata}\Stellarium\data\ssystem_minor.ini"; Tasks: removesolar
; Type: filesandordirs; Name: "{userappdata}\Stellarium\modules"; Tasks: removeplugins
; Type: filesandordirs; Name: "{localappdata}\stellarium\stellarium"; Tasks: removecache


[UninstallDelete]


[Icons]
; The default ones are already installed.

; Recommended use Inno Setup 5.5.3+
[Languages]
; Official translations of GUI of Inno Setup + translation Stellarium specific lines
Name: "en"; MessagesFile: "compiler:Default.isl,@CMAKE_SOURCE_DIR@\util\ISL\EnglishCM.isl"
Name: "ca"; MessagesFile: "compiler:Languages\Catalan.isl,@CMAKE_SOURCE_DIR@\util\ISL\CatalanCM.isl"
Name: "co"; MessagesFile: "compiler:Languages\Corsican.isl"
Name: "cs"; MessagesFile: "compiler:Languages\Czech.isl"
Name: "da"; MessagesFile: "compiler:Languages\Danish.isl"
Name: "nl"; MessagesFile: "compiler:Languages\Dutch.isl"
Name: "fi"; MessagesFile: "compiler:Languages\Finnish.isl"
Name: "fr"; MessagesFile: "compiler:Languages\French.isl,@CMAKE_SOURCE_DIR@\util\ISL\FrenchCM.isl"
Name: "de"; MessagesFile: "compiler:Languages\German.isl,@CMAKE_SOURCE_DIR@\util\ISL\GermanCM.isl"
Name: "he"; MessagesFile: "compiler:Languages\Hebrew.isl"
Name: "it"; MessagesFile: "compiler:Languages\Italian.isl"
Name: "ja"; MessagesFile: "compiler:Languages\Japanese.isl"
Name: "no"; MessagesFile: "compiler:Languages\Norwegian.isl,@CMAKE_SOURCE_DIR@\util\ISL\NorwegianCM.isl"
Name: "pl"; MessagesFile: "compiler:Languages\Polish.isl"
Name: "pt_BR"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl,@CMAKE_SOURCE_DIR@\util\ISL\BrazilianPortugueseCM.isl"
Name: "pt"; MessagesFile: "compiler:Languages\Portuguese.isl"
Name: "ru"; MessagesFile: "compiler:Languages\Russian.isl,@CMAKE_SOURCE_DIR@\util\ISL\RussianCM.isl"
Name: "sl"; MessagesFile: "compiler:Languages\Slovenian.isl"
Name: "es"; MessagesFile: "compiler:Languages\Spanish.isl"
Name: "uk"; MessagesFile: "compiler:Languages\Ukrainian.isl,@CMAKE_SOURCE_DIR@\util\ISL\UkrainianCM.isl"
; Unofficial translations of GUI of Inno Setup
Name: "el"; MessagesFile: "@CMAKE_SOURCE_DIR@\util\ISL\Greek.isl"
Name: "hu"; MessagesFile: "@CMAKE_SOURCE_DIR@\util\ISL\Hungarian.isl"
Name: "sr"; MessagesFile: "@CMAKE_SOURCE_DIR@\util\ISL\SerbianCyrillic.isl"
Name: "bg"; MessagesFile: "@CMAKE_SOURCE_DIR@\util\ISL\Bulgarian.isl,@CMAKE_SOURCE_DIR@\util\ISL\BulgarianCM.isl"
Name: "bs"; MessagesFile: "@CMAKE_SOURCE_DIR@\util\ISL\Bosnian.isl,@CMAKE_SOURCE_DIR@\util\ISL\BosnianCM.isl"
Name: "ko"; MessagesFile: "@CMAKE_SOURCE_DIR@\util\ISL\Korean.isl,@CMAKE_SOURCE_DIR@\util\ISL\KoreanCM.isl"
Name: "zh_CN"; MessagesFile: "@CMAKE_SOURCE_DIR@\util\ISL\ChineseSimplified.isl,@CMAKE_SOURCE_DIR@\util\ISL\ChineseSimplifiedCM.isl"
Name: "zh_TW"; MessagesFile: "@CMAKE_SOURCE_DIR@\util\ISL\ChineseTraditional.isl,@CMAKE_SOURCE_DIR@\util\ISL\ChineseTraditionalCM.isl"

; Made by Sharkbyte

#define MyAppName "SharkWrite"
#define MyAppVersion "2.0"
#define MyAppPublisher "Sharkbyteprojects"
#define MyAppURL "https://bit.ly/BlogShark"
#define MyAppExeName "SharkWrite.exe"

[Setup]
AppId={{DCB13B54-98DF-410B-9D0F-A9B9A4890948}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DisableProgramGroupPage=yes
LicenseFile=..\License.rtf
PrivilegesRequiredOverridesAllowed=dialog
OutputDir=.
OutputBaseFilename=sharkwrite-setup-win-x64.exe
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "starticon"; Description: "Create Start Menu"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: ".\SharkWrite-win32-x64\SharkWrite.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: ".\SharkWrite-win32-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: starticon
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent


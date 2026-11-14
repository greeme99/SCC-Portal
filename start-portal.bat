@echo off
chcp 65001 > nul
title SCC Coaching Portal - 서버 구동

echo ========================================================
echo   SCC Coaching Portal (삼코동 코칭 포털) 개발 서버 구동기
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Node.js / npm 환경변수 경로 보강 (NVM 환경 대응)
where node >nul 2>&1
if %errorlevel% neq 0 (
    if exist "C:\nvm4w\nodejs\node.exe" (
        set "PATH=C:\nvm4w\nodejs;C:\Users\0208m\AppData\Local\nvm;%PATH%"
    ) else if exist "C:\Program Files\nodejs\node.exe" (
        set "PATH=C:\Program Files\nodejs;%PATH%"
    )
)

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [오류] Node.js 실행 파일을 찾을 수 없습니다.
    echo Node.js 설치 또는 PATH 설정을 확인해 주세요.
    pause
    exit /b 1
)

:: 2. .env.local 확인 (비밀번호 미설정 시 발생하는 503 방지)
if not exist ".env.local" (
    echo [.env.local 생성] 로컬 테스트용 환경변수 파일이 없어 생성합니다.
    echo SITE_PASSWORD=1234 > .env.local
    echo [안내] 기본 사이트 입장 비밀번호가 "1234"로 설정되었습니다.
    echo       (.env.local 파일에서 언제든 변경할 수 있습니다.)
    echo.
)

:: 3. node_modules 확인
if not exist "node_modules" (
    echo [라이브러리 설치] 필수 패키지를 설치 중입니다 (최초 1회 실행)...
    call npm install
    if %errorlevel% neq 0 (
        echo [오류] npm install 중 문제가 발생했습니다.
        pause
        exit /b 1
    )
    echo.
)

echo [1/2] 개발 서버를 시작합니다... (http://localhost:3000)
echo [2/2] 서버 준비 완료 후 크롬 브라우저가 자동으로 열립니다.
echo.
echo * 창을 닫으면 서버가 종료됩니다.
echo * 소스 코드를 수정하면 브라우저에 즉시 실시간(Hot Reload) 반영됩니다.
echo --------------------------------------------------------

:: 4. 3000번 포트 연결 준비 후 크롬 브라우저 자동 실행 (백그라운드 감지)
start "" /b powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$portReady = $false; ^
    for ($i = 0; $i -lt 30; $i++) { ^
        Start-Sleep -Seconds 1; ^
        try { ^
            $tcp = New-Object System.Net.Sockets.TcpClient('127.0.0.1', 3000); ^
            if ($tcp.Connected) { ^
                $tcp.Close(); ^
                $portReady = $true; ^
                break; ^
            } ^
        } catch {} ^
    }; ^
    try { ^
        Start-Process 'chrome.exe' 'http://localhost:3000' -ErrorAction Stop; ^
    } catch { ^
        Start-Process 'http://localhost:3000'; ^
    }"

:: 5. Next.js 개발 서버 실행
call npm run dev


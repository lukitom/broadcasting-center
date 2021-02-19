<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="">
    <title>Strona główna Broadcasting Center</title>
</head>
<body>
    <section id="naglowek" class="header-section">
        <header id="header" class="header-tag">
            <!-- miejsce na nagłówek-->
        </header>
        <div id="login" class="user-panel">
            <!-- przekierowuje do strony logowania, pokazuje status użytkownika, czy zalogowany-->
            <a href="login.php" id="link-login" class="link">Zaloguj się</a>
            <a href="register-form.php" id="link-register" class="link">Zarejestruj się</a>
        </div>
    </section>

    <section id="menu-section" class="nav-section">
        <nav class="nav" id="menu">
            <!-- miejsce na menu-->
        </nav>
    </section>

    <section id="main" class="container">
        <div id="playlista" class="panel-lewy">
            <!-- lista piosenek do odtworzenia-->
        </div>
        <div id="odsluchane" class="panel-prawy">
            <!-- miejsce na liste odtwarzonych piosenek-->
        </div>
    </section>

    <section id="stopka" class="footer-section">
        <footer id="footer" class="footer-tag">
            <!-- stopka-->
        </footer>
    </section>
</body>
</html>
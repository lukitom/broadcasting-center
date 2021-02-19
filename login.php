<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Strona logowania do Broadcasting Center - strony do automatycznego odtwarzania playslist tworzonych przez uczniów  w radiowęźle szkolnym">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="">
    <title>Zaloguj się do Broadcasting Center</title>
</head>
<body>
    <section id="naglowek" class="header-section">
        <header id="header" class="header-tag">
            <!-- miejsce na nagłówek-->
        </header>
    </section>

    <section id="main" class="container">
        <div id="logowanie" class="form-div">
            <!-- po zalogowaniu przenosi na stronę główną "index.php"-->
            <form action="" method="POST" id="login" class="formularz">
                <label>Login</label><input class="text-form" id="login-log-in" type="text" name="login-log" placeholder="Podaj swój login" required /><br>
                <label>Hasło</label><input class="password-form" id="password" type="password" name="haslo" placeholder="Podaj hasło" required /><br>
                <button class="przycisk" type="submit" id="zaloguj" name="zaloguj">Zaloguj</button>
            </form>
        </div>
        <div id="rejestracja" class="link-div">
            <a class="link" id="link-register" href="register-form.php">Zarejestruj się</a>
        </div>
    </section>

    <section id="stopka" class="footer-section">
        <footer id="footer" class="footer-tag">
            <!-- stopka-->
        </footer>
    </section>
</body>
</html>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/css-register-form.css">
    <title>Rejestracja w Broadcasting Center</title>
</head>
<body>
    <section id="naglowek" class="header-section">
        <header id="header" class="header-tag">
            <!-- miejsce na nagłówek-->
        </header>
    </section>

    <section id="main" class="container">
        <div id="form-register-div" class="form-div">
            <!-- miejsce na formularz z rejestracją-->
            <form action="" method="POST" id="register-form" class="formularz">
                <label>Login</label><input class="text-form" id="login-register" type="text" name="login-register" placeholder="Podaj login" required><br>
                <label>E-mail</label><input class="text-form" id="email-register" type="text" name="e-mail" placeholder="Podaj swój e-mail" required><br>
                <label>Hasło</label><input class="password-form" id="password" type="password" name="haslo" placeholder="Podaj swoje hasło" required><br>
                <button class="przycisk" type="submit" id="zarejestruj" name="zarejestruj">Zarejestruj</button>
            </form><br>
            
        </div>
        <div id="login=link" class="link-div">
            <a href="login.php" id="link-login" class="link">Zaloguj się</a>
        </div>
    </section>

    <section id="stopka" class="footer-section">
        <footer id="footer" class="footer-tag">
            <!-- stopka-->
        </footer>
    </section>
</body>
</html>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "twoj_email@domena.pl"; // wpisz swój adres e-mail
    $subject = "Nowa wiadomość z formularza FreshTuff";
    $message =
        "Imię: " . $_POST["firstName"] . "\n" .
        "Nazwisko: " . $_POST["lastName"] . "\n" .
        "Telefon: " . $_POST["phone"] . "\n" .
        "Email: " . $_POST["email"] . "\n" .
        "Usługa: " . $_POST["service"] . "\n" .
        "Miasto: " . $_POST["city"] . "\n" .
        "Wiadomość: " . $_POST["message"];
    $headers = "From: " . $_POST["email"];

    if (mail($to, $subject, $message, $headers)) {
        echo "Dziękujemy za kontakt! Wiadomość została wysłana.";
    } else {
        echo "Wystąpił błąd podczas wysyłania wiadomości.";
    }
}
?>
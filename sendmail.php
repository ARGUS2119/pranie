<?php
/**
 * FreshTuff — prosty handler formularza kontaktowego.
 *
 * Oczekiwane pola (POST):
 * - firstName, lastName, phone, email, city, message, service (opcjonalnie)
 *
 * UWAGA bezpieczeństwo:
 * - Ten skrypt to minimalny przykład. W produkcji zalecane: walidacja danych,
 *   filtrowanie nagłówków (ochrona przed header injection), captcha/rate limiting,
 *   oraz użycie biblioteki (np. PHPMailer) z uwierzytelnieniem SMTP.
 */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Konfiguracja adresata — ZMIEŃ na swój adres
    $to = 'twoj_email@domena.pl';
    $subject = 'Nowa wiadomość z formularza FreshTuff';

    // Prosta normalizacja (bez zaawansowanej walidacji)
    $firstName = trim($_POST['firstName'] ?? '');
    $lastName  = trim($_POST['lastName']  ?? '');
    $phone     = trim($_POST['phone']     ?? '');
    $email     = trim($_POST['email']     ?? '');
    $service   = trim($_POST['service']   ?? '');
    $city      = trim($_POST['city']      ?? '');
    $msg       = trim($_POST['message']   ?? '');

    $message =
        "Imię: {$firstName}\n" .
        "Nazwisko: {$lastName}\n" .
        "Telefon: {$phone}\n" .
        "Email: {$email}\n" .
        "Usługa: {$service}\n" .
        "Miasto: {$city}\n" .
        "Wiadomość: {$msg}";

    // Minimalne nagłówki — w produkcji rozważ PHPMailer/SMTP
    $headers = 'From: ' . $email;

    if (mail($to, $subject, $message, $headers)) {
        echo 'Dziękujemy za kontakt! Wiadomość została wysłana.';
    } else {
        echo 'Wystąpił błąd podczas wysyłania wiadomości.';
    }
}
?>
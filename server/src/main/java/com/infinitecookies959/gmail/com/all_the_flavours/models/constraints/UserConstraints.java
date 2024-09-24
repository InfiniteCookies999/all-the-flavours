package com.infinitecookies959.gmail.com.all_the_flavours.models.constraints;

public class UserConstraints {

    /** Maximum length for user's first and last name. */
    public static final int MAX_NAME_LENGTH = 40;

    /**
     * Regular expression pattern for names.
     * <p>
     * Names are restricted to lowercase and uppercase letters,
     * spaces, and hyphens.
     * </p>
     */
    public static final String NAME_PATTERN = "^[A-Za-z\\s-]+$";

    /** Maximum length for usernames. */
    public static final int MAX_USERNAME_LENGTH = 32;

    /**
     * Regular expression pattern for usernames.
     * <p>
     * Usernames can contain letters, numbers, underscores, and hyphens.
     * </p>
     */
    public static final String USERNAME_PATTERN = "^[A-Za-z0-9_-]+$";

    /**
     * Regular expression pattern for phone numbers.
     * <p>
     * The pattern supports the format: xxx-xxx-xxxx, where x is a digit.
     * </p>
     */
    public static final String PHONE_PATTERN = "^(\\d{3})-(\\d{3})-(\\d{4})$";

    /** Maximum length for user bios. */
    public static final int MAX_BIO_LENGTH = 500;

    /** Minimum length for passwords. */
    public static final int MIN_PASSWORD_LENGTH = 8;

    /** Maximum length for passwords. */
    public static final int MAX_PASSWORD_LENGTH = 100;

    /**
     * Regular expression pattern for passwords.
     * <p>
     * Passwords must satisfy the following constraints:
     * <ul>
     *   <li>At least one lowercase letter</li>
     *   <li>At least one uppercase letter</li>
     *   <li>At least one digit</li>
     *   <li>At least one special character (one of: @, $, !, %, *, ?, &)</li>
     *   <li>Length between {@link #MIN_PASSWORD_LENGTH} and {@link #MAX_PASSWORD_LENGTH}</li>
     * </ul>
     * </p>
     */
    public static final String PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{" + MIN_PASSWORD_LENGTH + "," + MAX_PASSWORD_LENGTH + "}$";
}

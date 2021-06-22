package com.tampro.ManageService.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CommonUtil {
    public static boolean isValidPattern(String str, String regex) {

        if (regex == null) {
            throw new IllegalArgumentException("Regex pattern must not be null");
        }

        if (!str.isEmpty()) {
            Pattern pattern = Pattern.compile(regex);
            Matcher matcher = pattern.matcher(str);
            return matcher.matches();
        }

        return false;
    }
}

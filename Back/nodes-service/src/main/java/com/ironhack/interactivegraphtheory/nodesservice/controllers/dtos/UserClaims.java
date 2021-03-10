package com.ironhack.interactivegraphtheory.nodesservice.controllers.dtos;

public class UserClaims {
    private String user;
    private String[] roles;
    private String id;
    private String exp;
    private String iat;

    public UserClaims(String user, String[] roles, String id, String exp, String iat) {
        this.user = user;
        this.roles = roles;
        this.id = id;
        this.exp = exp;
        this.iat = iat;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public String getExp() {
        return exp;
    }

    public void setExp(String exp) {
        this.exp = exp;
    }

    public String getIat() {
        return iat;
    }

    public void setIat(String iat) {
        this.iat = iat;
    }
}

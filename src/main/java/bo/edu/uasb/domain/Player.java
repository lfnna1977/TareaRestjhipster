package bo.edu.uasb.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import bo.edu.uasb.domain.enumeration.Gender;

/**
 * A Player.
 */
@Entity
@Table(name = "player")
public class Player implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "ci", length = 60, nullable = false)
    private String ci;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "name", length = 60, nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "position", length = 60, nullable = false)
    private String position;

    @Column(name = "aditional_data")
    private String aditionalData;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("players")
    private Country country;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("players")
    private Club club;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCi() {
        return ci;
    }

    public Player ci(String ci) {
        this.ci = ci;
        return this;
    }

    public void setCi(String ci) {
        this.ci = ci;
    }

    public String getName() {
        return name;
    }

    public Player name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Gender getGender() {
        return gender;
    }

    public Player gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getPosition() {
        return position;
    }

    public Player position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getAditionalData() {
        return aditionalData;
    }

    public Player aditionalData(String aditionalData) {
        this.aditionalData = aditionalData;
        return this;
    }

    public void setAditionalData(String aditionalData) {
        this.aditionalData = aditionalData;
    }

    public Country getCountry() {
        return country;
    }

    public Player country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Club getClub() {
        return club;
    }

    public Player club(Club club) {
        this.club = club;
        return this;
    }

    public void setClub(Club club) {
        this.club = club;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Player)) {
            return false;
        }
        return id != null && id.equals(((Player) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Player{" +
            "id=" + getId() +
            ", ci='" + getCi() + "'" +
            ", name='" + getName() + "'" +
            ", gender='" + getGender() + "'" +
            ", position='" + getPosition() + "'" +
            ", aditionalData='" + getAditionalData() + "'" +
            "}";
    }
}

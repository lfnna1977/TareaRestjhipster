package bo.edu.uasb.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Club.
 */
@Entity
@Table(name = "club")
public class Club implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "name", length = 60, nullable = false)
    private String name;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "city", length = 60, nullable = false)
    private String city;

    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "telephone", length = 60, nullable = false)
    private String telephone;

    @Column(name = "num_socios")
    private Integer numSocios;

    @OneToMany(mappedBy = "club")
    private Set<Player> players = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Club name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public Club city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getTelephone() {
        return telephone;
    }

    public Club telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Integer getNumSocios() {
        return numSocios;
    }

    public Club numSocios(Integer numSocios) {
        this.numSocios = numSocios;
        return this;
    }

    public void setNumSocios(Integer numSocios) {
        this.numSocios = numSocios;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public Club players(Set<Player> players) {
        this.players = players;
        return this;
    }

    public Club addPlayer(Player player) {
        this.players.add(player);
        player.setClub(this);
        return this;
    }

    public Club removePlayer(Player player) {
        this.players.remove(player);
        player.setClub(null);
        return this;
    }

    public void setPlayers(Set<Player> players) {
        this.players = players;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Club)) {
            return false;
        }
        return id != null && id.equals(((Club) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Club{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", city='" + getCity() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", numSocios=" + getNumSocios() +
            "}";
    }
}

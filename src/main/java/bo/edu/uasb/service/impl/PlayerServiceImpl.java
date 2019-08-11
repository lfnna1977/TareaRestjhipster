package bo.edu.uasb.service.impl;

import bo.edu.uasb.service.PlayerService;
import bo.edu.uasb.domain.Player;
import bo.edu.uasb.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Player}.
 */
@Service
@Transactional
public class PlayerServiceImpl implements PlayerService {

    private final Logger log = LoggerFactory.getLogger(PlayerServiceImpl.class);

    private final PlayerRepository playerRepository;

    public PlayerServiceImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    /**
     * Save a player.
     *
     * @param player the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Player save(Player player) {
        log.debug("Request to save Player : {}", player);
        return playerRepository.save(player);
    }

    /**
     * Get all the players.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Player> findAll(Pageable pageable) {
        log.debug("Request to get all Players");
        return playerRepository.findAll(pageable);
    }


    /**
     * Get one player by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Player> findOne(Long id) {
        log.debug("Request to get Player : {}", id);
        return playerRepository.findById(id);
    }

    /**
     * Delete the player by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Player : {}", id);
        playerRepository.deleteById(id);
    }
    
    /**
     * Save a player.
     *
     * @param player the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Player partialSave(Player partialPlayer) {
        log.debug("Request to save Player : {}", partialPlayer);
        
        Optional<Player> player = playerRepository.findById(partialPlayer.getId());
        if (partialPlayer.getCi() == null) {
        	partialPlayer.setCi(player.get().getCi());
        }
        if (partialPlayer.getName() == null) {
        	partialPlayer.setName(player.get().getName());
        }
        if (partialPlayer.getGender() == null) {
        	partialPlayer.setGender(player.get().getGender());
        }
        if (partialPlayer.getPosition() == null) {
        	partialPlayer.setPosition(player.get().getPosition());
        }
        if (partialPlayer.getAditionalData() == null) {
        	partialPlayer.setAditionalData(player.get().getAditionalData());
        }
        if (partialPlayer.getCountry() == null) {
        	partialPlayer.setCountry(player.get().getCountry());
        }
        if (partialPlayer.getClub() == null) {
        	partialPlayer.setClub(player.get().getClub());
        }        

        return playerRepository.save(partialPlayer);
    }
}

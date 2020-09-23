<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200902132751 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE articles (id INT AUTO_INCREMENT NOT NULL, category_id INT DEFAULT NULL, user_id INT NOT NULL, location_id INT NOT NULL, title VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, price DOUBLE PRECISION NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_BFDD316812469DE2 (category_id), INDEX IDX_BFDD3168A76ED395 (user_id), INDEX IDX_BFDD316864D218E (location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, icon VARCHAR(255) NOT NULL, background_color VARCHAR(255) NOT NULL, color VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE images (id INT AUTO_INCREMENT NOT NULL, articles_id INT NOT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_E01FBE6A1EBAF6CC (articles_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE location (id INT AUTO_INCREMENT NOT NULL, latitude VARCHAR(255) NOT NULL, longitude VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messages (id INT AUTO_INCREMENT NOT NULL, from_user_id INT NOT NULL, to_user_id INT NOT NULL, article_id INT NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_DB021E962130303A (from_user_id), INDEX IDX_DB021E9629F6EE60 (to_user_id), INDEX IDX_DB021E967294869C (article_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE users (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, email LONGTEXT NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE articles ADD CONSTRAINT FK_BFDD316812469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE articles ADD CONSTRAINT FK_BFDD3168A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE articles ADD CONSTRAINT FK_BFDD316864D218E FOREIGN KEY (location_id) REFERENCES location (id)');
        $this->addSql('ALTER TABLE images ADD CONSTRAINT FK_E01FBE6A1EBAF6CC FOREIGN KEY (articles_id) REFERENCES articles (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E962130303A FOREIGN KEY (from_user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E9629F6EE60 FOREIGN KEY (to_user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E967294869C FOREIGN KEY (article_id) REFERENCES articles (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE images DROP FOREIGN KEY FK_E01FBE6A1EBAF6CC');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E967294869C');
        $this->addSql('ALTER TABLE articles DROP FOREIGN KEY FK_BFDD316812469DE2');
        $this->addSql('ALTER TABLE articles DROP FOREIGN KEY FK_BFDD316864D218E');
        $this->addSql('ALTER TABLE articles DROP FOREIGN KEY FK_BFDD3168A76ED395');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E962130303A');
        $this->addSql('ALTER TABLE messages DROP FOREIGN KEY FK_DB021E9629F6EE60');
        $this->addSql('DROP TABLE articles');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE images');
        $this->addSql('DROP TABLE location');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE users');
    }
}

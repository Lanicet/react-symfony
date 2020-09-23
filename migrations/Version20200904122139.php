<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200904122139 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE messages');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE messages (id INT AUTO_INCREMENT NOT NULL, from_user_id INT NOT NULL, to_user_id INT NOT NULL, article_id INT NOT NULL, content LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL, INDEX IDX_DB021E962130303A (from_user_id), INDEX IDX_DB021E9629F6EE60 (to_user_id), INDEX IDX_DB021E967294869C (article_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E962130303A FOREIGN KEY (from_user_id) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E9629F6EE60 FOREIGN KEY (to_user_id) REFERENCES users (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE messages ADD CONSTRAINT FK_DB021E967294869C FOREIGN KEY (article_id) REFERENCES articles (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}

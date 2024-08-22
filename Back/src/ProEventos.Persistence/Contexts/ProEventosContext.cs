using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contexts
{
    /// <summary>
    /// Fornece acesso à base de dados -> Não esquecer das tabelas no plural
    /// </summary>
    public class ProEventosContext : DbContext
    {
        public ProEventosContext(DbContextOptions<ProEventosContext> options) : base(options) { }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Indicação das chaves estrangeiras para a tabela relacional entre Eventos e Palestrantes na criação da BD pelo Context
            modelBuilder.Entity<PalestranteEvento>()
                .HasKey(PE => new {PE.EventoId, PE.PalestranteId});

            // Informa a BD que sempre que um Evento for eliminado também tem de eliminar as RedesSociais associadas ao mesmo
            modelBuilder.Entity<Evento>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Evento)
                .OnDelete(DeleteBehavior.Cascade);

            // Informa a BD que sempre que um Palestrante for eliminado também tem de eliminar as RedesSociais associadas ao mesmo
            modelBuilder.Entity<Palestrante>()
                .HasMany(p => p.RedesSociais)
                .WithOne(rs => rs.Palestrante)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
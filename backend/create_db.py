import asyncio
import asyncpg

async def main():
    try:
        # Connect to the default 'postgres' database to execute CREATE DATABASE
        conn = await asyncpg.connect(user='postgres', password='postgres', database='postgres', host='localhost', port=5432)
        print("Connected to PostgreSQL successfully.")
        
        # Check if database exists
        exists = await conn.fetchval("SELECT 1 FROM pg_database WHERE datname = 'saferx'")
        if not exists:
            print("Creating database 'saferx'...")
            await conn.execute('CREATE DATABASE saferx')
            print("Database created.")
        else:
            print("Database 'saferx' already exists.")
            
        await conn.close()
    except Exception as e:
        print(f"Error connecting to PostgreSQL or creating database: {e}")

if __name__ == '__main__':
    asyncio.run(main())
